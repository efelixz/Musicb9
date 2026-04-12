import os
import time
from celery import Celery

REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")

app = Celery(
    "voicify_worker",
    broker=REDIS_URL,
    backend=REDIS_URL
)

app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

@app.task(name="process_voice_clone")
def process_voice_clone(user_id: str, voice_id: str):
    print(f"Iniciando clonagem de voz para {user_id} - voz: {voice_id}")
    time.sleep(5)  # Simula processamento pesado
    return {"status": "success", "voice_id": voice_id}

@app.task(name="generate_music_assets")
def generate_music_assets(project_id: str, asset_type: str):
    print(f"Gerando assets de música para projeto {project_id} - tipo: {asset_type}")
    time.sleep(10)  # Simula geração de IA
    return {"status": "ready", "project_id": project_id, "asset": asset_type}
