import uuid
from apps.api.models import Plan
from apps.api.database import SessionLocal

def seed_plans():
    db = SessionLocal()
    try:
        # Verifica se já existem planos
        if db.query(Plan).count() > 0:
            print("Planos já existem. Pulando seed.")
            return

        plans = [
            Plan(id=uuid.uuid4(), name="Creator", price=49.0, included_credits=10),
            Plan(id=uuid.uuid4(), name="Pro", price=149.0, included_credits=50),
            Plan(id=uuid.uuid4(), name="Artist", price=399.0, included_credits=500),
        ]
        db.add_all(plans)
        db.commit()
        print("Planos populados com sucesso!")
    finally:
        db.close()

if __name__ == "__main__":
    seed_plans()
