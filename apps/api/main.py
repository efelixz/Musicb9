from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from fastapi import UploadFile, File
from .database import get_db, engine
from .models import (
    Base, User, VoiceProfile, Project, Lyrics, VoiceSample, ConsentRecord,
    Plan, Subscription, CreditLedger, Job, Export, Notification, AuditLog, APIKey, Preset, MarketplaceVoice
)
from .auth import get_password_hash, verify_password, create_access_token, get_current_user
from .worker import process_voice_clone
from .core.storage import storage
from .core.search import search_service

# Cria as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Voicify API",
    description="Backend para plataforma de música com IA e voz própria",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schemas Pydantic
class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class VoiceProfileCreate(BaseModel):
    name: str

class ProjectCreate(BaseModel):
    title: str
    genre: str = "Pop"
    bpm: int = 120
    mood: str = "Happy"

class LyricsCreate(BaseModel):
    raw_text: str
    language: str = "pt-BR"

@app.get("/")
async def root():
    return {"message": "Bem-vindo à Voicify API", "status": "online"}

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/auth/register", response_model=Token)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user_in.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        email=user_in.email,
        password_hash=get_password_hash(user_in.password),
        full_name=user_in.full_name
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(data={"sub": new_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/auth/login", response_model=Token)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not verify_password(user_in.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/voices")
def list_voices(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(VoiceProfile).filter(VoiceProfile.user_id == current_user.id).all()

@app.post("/voices/{voice_id}/consent")
def record_consent(voice_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Simula gravação de registro de consentimento
    consent = ConsentRecord(
        user_id=current_user.id,
        voice_profile_id=voice_id,
        document_ref="internal://consent-v1"
    )
    db.add(consent)

    voice = db.query(VoiceProfile).filter(VoiceProfile.id == voice_id).first()
    if voice:
        voice.status = "consented"

    db.commit()
    return {"status": "consented"}

@app.post("/voices/{voice_id}/samples")
async def upload_sample(voice_id: str, file: UploadFile = File(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # IA GOVERNANCE: Verificação de Segurança (Trust & Safety)
    # Em produção, carregaríamos o TrustSafetyService
    # is_safe = trust_safety.scan_vocal_sample(file.file.read())

    file_path = await storage.save_sample(voice_id, file)

    sample = VoiceSample(
        voice_profile_id=voice_id,
        file_url=file_path,
        sample_type="guided"
    )
    db.add(sample)
    db.commit()
    return {"status": "uploaded", "path": file_path}

@app.post("/voices")
def create_voice(voice_in: VoiceProfileCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    new_voice = VoiceProfile(
        name=voice_in.name,
        user_id=current_user.id
    )
    db.add(new_voice)
    db.commit()
    db.refresh(new_voice)
    return new_voice

@app.get("/projects")
def list_projects(q: str = None, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    query = db.query(Project).filter(Project.user_id == current_user.id)
    if q:
        query = query.filter(Project.title.ilike(f"%{q}%"))
    return query.all()

@app.get("/marketplace/voices")
def list_marketplace_voices(db: Session = Depends(get_db)):
    return db.query(MarketplaceVoice).filter(MarketplaceVoice.is_active == True).all()

@app.post("/marketplace/voices/{voice_id}/activate")
def activate_marketplace_voice(voice_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    voice = db.query(MarketplaceVoice).filter(MarketplaceVoice.id == voice_id).first()
    if not voice:
        raise HTTPException(status_code=404, detail="Voice not found")

    # Verifica créditos
    ledgers = db.query(CreditLedger).filter(CreditLedger.user_id == current_user.id).all()
    balance = sum(l.delta for l in ledgers)
    if balance < voice.price_credits:
        raise HTTPException(status_code=402, detail="Insufficient credits")

    # Consome créditos e ativa (cria perfil vocal para o usuário)
    db.add(CreditLedger(user_id=current_user.id, delta=-voice.price_credits, reason=f"Marketplace: {voice.name}"))
    new_profile = VoiceProfile(user_id=current_user.id, name=voice.name, status="ready", fidelity_score=1.0)
    db.add(new_profile)
    db.commit()

    return {"status": "activated", "profile_id": new_profile.id}

@app.post("/projects")
def create_project(project_in: ProjectCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    new_project = Project(
        title=project_in.title,
        genre=project_in.genre,
        bpm=project_in.bpm,
        mood=project_in.mood,
        user_id=current_user.id
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@app.get("/projects/{project_id}")
def get_project(project_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # REGRA DE NEGÓCIO: Ranking e Sugestão de Arranjos (Seção 4.3)
    # Simula a sugestão de presets baseados no BPM e Gênero do projeto
    suggested_presets = db.query(Preset).filter(
        Preset.category == "arrangement",
        Preset.config_json["genre"].astext == project.genre
    ).limit(3).all()

    return {
        "project": project,
        "versions": {
            "melodies": db.query(MelodyVersion).filter(MelodyVersion.project_id == project_id).all(),
            "arrangements": db.query(ArrangementVersion).filter(ArrangementVersion.project_id == project_id).all(),
            "renders": db.query(VocalRender).filter(VocalRender.project_id == project_id).all()
        },
        "recommendations": {
            "arrangements": suggested_presets,
            "tempo_match": True if project.bpm >= 100 else False
        }
    }

@app.post("/projects/{project_id}/lyrics")
def update_project_lyrics(project_id: str, lyrics_in: LyricsCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    existing_lyrics = db.query(Lyrics).filter(Lyrics.project_id == project_id).first()
    if existing_lyrics:
        existing_lyrics.raw_text = lyrics_in.raw_text
        existing_lyrics.language = lyrics_in.language
        db.commit()
        db.refresh(existing_lyrics)
        return existing_lyrics

    new_lyrics = Lyrics(
        project_id=project_id,
        raw_text=lyrics_in.raw_text,
        language=lyrics_in.language
    )
    db.add(new_lyrics)
    db.commit()
    db.refresh(new_lyrics)
    return new_lyrics

@app.post("/projects/{project_id}/generate-melody")
def generate_melody(project_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # REGRA DE NEGÓCIO: Verificação de créditos
    ledgers = db.query(CreditLedger).filter(CreditLedger.user_id == current_user.id).all()
    balance = sum(l.delta for l in ledgers)
    if balance < 1:
        raise HTTPException(status_code=402, detail="Insufficient credits")

    # REGRA DE NEGÓCIO: Verificar se há voz pronta/autorizada
    voice = db.query(VoiceProfile).filter(VoiceProfile.user_id == current_user.id, VoiceProfile.status == "ready").first()
    if not voice:
        raise HTTPException(status_code=400, detail="No ready/authorized voice profile found")

    # REGRA DE NEGÓCIO: Score mínimo de qualidade (exemplo 0.8)
    if voice.fidelity_score and voice.fidelity_score < 0.8:
        raise HTTPException(status_code=400, detail="Voice profile quality too low for generation")

    # Consome crédito
    db.add(CreditLedger(user_id=current_user.id, delta=-1, reason="Melody Generation", project_id=project.id))

    # Cria registro de job
    job = Job(project_id=project.id, job_type="melody_generation", status="pending")
    db.add(job)
    db.commit()

    # Disparo de tarefa assíncrona
    task = process_voice_clone.delay(str(current_user.id), "melody-gen")
    return {"task_id": task.id, "job_id": job.id, "status": "processing"}

# --- Novos domínios ---

# Billing
@app.get("/billing/plans")
def list_plans(db: Session = Depends(get_db)):
    return db.query(Plan).all()

@app.get("/billing/subscription")
def get_subscription(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Subscription).filter(Subscription.user_id == current_user.id).first()

@app.get("/billing/credits")
def get_credits(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    ledgers = db.query(CreditLedger).filter(CreditLedger.user_id == current_user.id).all()
    total = sum(l.delta for l in ledgers)
    return {"balance": total}

@app.post("/billing/checkout")
def create_checkout_session(plan_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Simula integração com Stripe
    plan = db.query(Plan).filter(Plan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    # Simula sucesso imediato para o POC (em produção seria via webhook do Stripe)
    db.add(Subscription(user_id=current_user.id, plan_id=plan.id, status="active"))
    db.add(CreditLedger(user_id=current_user.id, delta=plan.included_credits, reason=f"Purchase: {plan.name}"))
    db.commit()

    return {"status": "success", "url": "https://stripe.com/mock-checkout"}

@app.post("/projects/{project_id}/export")
def export_project(project_id: str, export_format: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # REGRA DE NEGÓCIO: Certos exports exigem plano superior
    sub = db.query(Subscription).filter(Subscription.user_id == current_user.id, Subscription.status == "active").first()
    plan = db.query(Plan).filter(Plan.id == sub.plan_id).first() if sub else None

    if export_format in ["wav", "stems"] and (not plan or plan.name == "Creator"):
        raise HTTPException(status_code=403, detail="WAV and Stems export requires Pro or Artist plan")

    new_export = Export(project_id=project_id, format=export_format, file_url=f"exports/{project_id}/final.{export_format}")
    db.add(new_export)
    db.commit()
    return new_export

# Notifications
@app.get("/notifications")
def list_notifications(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Notification).filter(Notification.user_id == current_user.id).order_by(Notification.created_at.desc()).all()

# Governance & Privacy (LGPD/GDPR)
@app.post("/privacy/revoke-consent")
def revoke_consent(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Localiza o registro de consentimento ativo
    consent = db.query(ConsentRecord).filter(ConsentRecord.user_id == current_user.id, ConsentRecord.revoked_at == None).first()
    if consent:
        consent.revoked_at = datetime.utcnow()
        db.add(AuditLog(actor_id=current_user.id, action="CONSENT_REVOKED", entity_type="consent_record", entity_id=str(consent.id)))

        # Bloqueia perfis vocais
        voices = db.query(VoiceProfile).filter(VoiceProfile.user_id == current_user.id).all()
        for v in voices:
            v.status = "blocked_by_revocation"

        db.commit()
    return {"status": "consent_revoked"}

@app.delete("/privacy/delete-data")
def delete_all_user_data(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Registro de auditoria antes da deleção (pseudonimizado ou log de sistema)
    db.add(AuditLog(action="USER_DATA_DELETION_REQUESTED", metadata_json={"user_id_ref": str(current_user.id)}))

    # Lógica de deleção em cascata (simplificada para o POC)
    db.query(VoiceProfile).filter(VoiceProfile.user_id == current_user.id).delete()
    db.query(Project).filter(Project.user_id == current_user.id).delete()
    db.commit()

    return {"status": "data_deletion_initiated"}

# Admin (Placeholder)
@app.get("/admin/stats")
def get_admin_stats(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Simula verificação de admin
    if current_user.email != "admin@voicify.ai":
         raise HTTPException(status_code=403, detail="Forbidden")

    return {
        "total_users": db.query(User).count(),
        "total_projects": db.query(Project).count(),
        "active_jobs": db.query(Job).filter(Job.status == "processing").count()
    }

# --- Enterprise & B2B ---

@app.post("/enterprise/keys")
def generate_api_key(name: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Simula geração de chave segura
    raw_key = f"sk_live_{uuid.uuid4().hex}"
    new_key = APIKey(
        user_id=current_user.id,
        key_hash=get_password_hash(raw_key), # Armazena hash por segurança
        name=name
    )
    db.add(new_key)
    db.commit()
    return {"name": name, "key": raw_key, "note": "Guarde esta chave, ela não será exibida novamente"}

@app.get("/enterprise/keys")
def list_api_keys(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(APIKey).filter(APIKey.user_id == current_user.id, APIKey.is_active == True).all()

# --- Presets & Library ---

@app.get("/presets")
def list_presets(category: str = None, db: Session = Depends(get_db)):
    query = db.query(Preset).filter(Preset.is_public == True)
    if category:
        query = query.filter(Preset.category == category)
    return query.all()

@app.get("/search")
def global_search(q: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Integração com OpenSearch/Elasticsearch
    results = search_service.query(q, str(current_user.id))

    # Fallback simples para banco relacional se busca externa estiver vazia
    if not results:
        projects = db.query(Project).filter(Project.user_id == current_user.id, Project.title.ilike(f"%{q}%")).all()
        return {"results": projects, "source": "database"}

    return {"results": results, "source": "opensearch"}
