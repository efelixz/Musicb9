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
    artistic_style = Column(String) # Pop, Dark, Rock, etc.
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
    quality_score = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="vocal_renders")
    melody_versions = relationship("MelodyVersion", back_populates="project")
    arrangement_versions = relationship("ArrangementVersion", back_populates="project")
    exports = relationship("Export", back_populates="project")
    jobs = relationship("Job", back_populates="project")

class MelodyVersion(Base):
    __tablename__ = "melody_versions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    midi_ref = Column(String)
    score = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="melody_versions")

class ArrangementVersion(Base):
    __tablename__ = "arrangement_versions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    stems_ref = Column(String)
    arrangement_json = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="arrangement_versions")

class Export(Base):
    __tablename__ = "exports"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    format = Column(String) # mp3, wav, stems
    file_url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="exports")

class Job(Base):
    __tablename__ = "jobs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=True)
    job_type = Column(String)
    status = Column(String, default="pending")
    priority = Column(Integer, default=0)
    started_at = Column(DateTime)
    finished_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="jobs")

class Comment(Base):
    __tablename__ = "comments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="comments")
    user = relationship("User")

class Subscription(Base):
    __tablename__ = "subscriptions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    plan_id = Column(UUID(as_uuid=True), ForeignKey("plans.id"), nullable=False)
    provider_id = Column(String)
    status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Plan(Base):
    __tablename__ = "plans"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    included_credits = Column(Integer, default=0)

class CreditLedger(Base):
    __tablename__ = "credit_ledger"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    delta = Column(Integer, nullable=False)
    reason = Column(String)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Invoice(Base):
    __tablename__ = "invoices"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String, default="USD")
    status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    actor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    action = Column(String, nullable=False)
    entity_type = Column(String)
    entity_id = Column(String)
    metadata_json = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    type = Column(String)
    payload = Column(JSON)
    read_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)

class SupportTicket(Base):
    __tablename__ = "support_tickets"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    subject = Column(String, nullable=False)
    status = Column(String, default="open")
    created_at = Column(DateTime, default=datetime.utcnow)

class Preset(Base):
    __tablename__ = "presets"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category = Column(String) # genre, mood, arrangement
    name = Column(String, nullable=False)
    config_json = Column(JSON)
    is_public = Column(Boolean, default=True)

class MarketplaceVoice(Base):
    __tablename__ = "marketplace_voices"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    genre = Column(String)
    tone = Column(String)
    price_credits = Column(Integer, default=0)
    sample_url = Column(String)
    is_active = Column(Boolean, default=True)

class APIKey(Base):
    __tablename__ = "api_keys"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    key_hash = Column(String, unique=True, nullable=False)
    name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime)

class ConsentRecord(Base):
    __tablename__ = "consent_records"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    voice_profile_id = Column(UUID(as_uuid=True), ForeignKey("voice_profiles.id"), nullable=True)
    accepted_at = Column(DateTime, default=datetime.utcnow)
    revoked_at = Column(DateTime)
    document_ref = Column(String)
