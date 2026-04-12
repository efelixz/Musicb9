from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from .database import get_db, engine
from .models import Base, User, VoiceProfile
from .auth import get_password_hash, verify_password, create_access_token, get_current_user

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
