from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from fastapi import UploadFile, File
from .database import get_db, engine
from .models import (
    Base, User, VoiceProfile, Project, Lyrics, VoiceSample, ConsentRecord,
    Plan, Subscription, CreditLedger, Job, Export, Notification, AuditLog
)
from .auth import get_password_hash, verify_password, create_access_token, get_current_user
from .worker import process_voice_clone
from .core.storage import storage

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
def list_projects(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Project).filter(Project.user_id == current_user.id).all()

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
    return project

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

# Notifications
@app.get("/notifications")
def list_notifications(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Notification).filter(Notification.user_id == current_user.id).order_by(Notification.created_at.desc()).all()

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
