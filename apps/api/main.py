from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from .database import get_db, engine
from .models import Base, User, VoiceProfile, Project, Lyrics
from .auth import get_password_hash, verify_password, create_access_token, get_current_user
from .worker import process_voice_clone

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

@app.get("/voices")
def list_voices(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(VoiceProfile).filter(VoiceProfile.user_id == current_user.id).all()

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

    # Mock de disparo de tarefa assíncrona
    task = process_voice_clone.delay(str(current_user.id), "melody-gen")
    return {"task_id": task.id, "status": "processing"}
