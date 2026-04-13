import os

class NotificationDispatcher:
    def __init__(self):
        self.resend_api_key = os.getenv("RESEND_API_KEY")
        self.twilio_sid = os.getenv("TWILIO_SID")

    async def send_email(self, to: str, subject: str, content: str):
        """Simula disparo de email via Resend"""
        print(f"[Email] Enviando para {to}: {subject}")
        return {"status": "sent"}

    async def send_sms(self, to: str, message: str):
        """Simula disparo de SMS via Twilio"""
        print(f"[SMS] Enviando para {to}: {message}")
        return {"status": "sent"}

    async def notify_job_completion(self, user_email: str, project_name: str):
        await self.send_email(
            user_email,
            "Sua música está pronta!",
            f"Olá! O render de '{project_name}' foi concluído com sucesso. Acesse seu dashboard para conferir."
        )

dispatcher = NotificationDispatcher()
