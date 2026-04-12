import os
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
    # Lógica para processamento de voz (Mock)
    return {"status": "success", "voice_id": voice_id}
