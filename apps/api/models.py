import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Integer, Boolean, ForeignKey, JSON, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String)
    status = Column(String, default="active")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    profile = relationship("UserProfile", back_populates="user", uselist=False)
    voice_profiles = relationship("VoiceProfile", back_populates="user")
    projects = relationship("Project", back_populates="user")

class UserProfile(Base):
    __tablename__ = "user_profiles"
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    avatar_url = Column(String)
    bio = Column(Text)
    preferences = Column(JSON, default={})
    country = Column(String)
    timezone = Column(String)

    user = relationship("User", back_populates="profile")

class VoiceProfile(Base):
    __tablename__ = "voice_profiles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    status = Column(String, default="pending")
    fidelity_score = Column(Float)
    metadata_json = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="voice_profiles")
    samples = relationship("VoiceSample", back_populates="voice_profile")
    embeddings = relationship("VoiceEmbedding", back_populates="voice_profile")

class VoiceSample(Base):
    __tablename__ = "voice_samples"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    voice_profile_id = Column(UUID(as_uuid=True), ForeignKey("voice_profiles.id"), nullable=False)
    file_url = Column(String, nullable=False)
    duration_sec = Column(Float)
    quality_score = Column(Float)
    sample_type = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    voice_profile = relationship("VoiceProfile", back_populates="samples")

class VoiceEmbedding(Base):
    __tablename__ = "voice_embeddings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    voice_profile_id = Column(UUID(as_uuid=True), ForeignKey("voice_profiles.id"), nullable=False)
    version = Column(String, nullable=False)
    embedding_vector_ref = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    voice_profile = relationship("VoiceProfile", back_populates="embeddings")

class Project(Base):
    __tablename__ = "projects"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    status = Column(String, default="draft")
    genre = Column(String)
    bpm = Column(Integer)
    mood = Column(String)
    key_signature = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="projects")
    lyrics = relationship("Lyrics", back_populates="project", uselist=False)
    vocal_renders = relationship("VocalRender", back_populates="project")

class Lyrics(Base):
    __tablename__ = "lyrics"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    raw_text = Column(Text, nullable=False)
    structured_json = Column(JSON)
    language = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="lyrics")

class VocalRender(Base):
    __tablename__ = "vocal_renders"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    voice_profile_id = Column(UUID(as_uuid=True), ForeignKey("voice_profiles.id"), nullable=False)
    file_url = Column(String)
    render_type = Column(String)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="vocal_renders")

class ConsentRecord(Base):
    __tablename__ = "consent_records"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    voice_profile_id = Column(UUID(as_uuid=True), ForeignKey("voice_profiles.id"), nullable=True)
    accepted_at = Column(DateTime, default=datetime.utcnow)
    revoked_at = Column(DateTime)
    document_ref = Column(String)
