from fastapi.testclient import TestClient
from apps.api.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_api_docs():
    response = client.get("/docs")
    assert response.status_code == 200
