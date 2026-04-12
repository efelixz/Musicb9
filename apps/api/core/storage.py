import os
import shutil
from fastapi import UploadFile

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "/tmp/voicify_uploads")

class StorageProvider:
    def __init__(self):
        if not os.path.exists(UPLOAD_DIR):
            os.makedirs(UPLOAD_DIR)

    async def save_sample(self, voice_profile_id: str, file: UploadFile) -> str:
        profile_dir = os.path.join(UPLOAD_DIR, voice_profile_id)
        if not os.path.exists(profile_dir):
            os.makedirs(profile_dir)

        file_path = os.path.join(profile_dir, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return file_path

storage = StorageProvider()
