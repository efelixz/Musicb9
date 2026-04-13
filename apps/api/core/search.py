import time

class SearchService:
    def __init__(self, endpoint: str = "http://opensearch:9200"):
        self.endpoint = endpoint

    def index_project(self, project_id: str, metadata: dict):
        """Indexa metadados de projeto para busca global"""
        print(f"[Search] Indexando projeto {project_id}...")
        return {"status": "indexed"}

    def query(self, text: str, user_id: str):
        """Realiza busca full-text em projetos e ativos"""
        print(f"[Search] Buscando '{text}' para usuário {user_id}...")
        time.sleep(0.1)
        return []

search_service = SearchService()
