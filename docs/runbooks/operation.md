# Runbook: Deploy e Operação

## Deploy Local
1. Instale Docker e Docker Compose.
2. Execute `docker-compose up --build`.
3. Acesse `http://localhost:3000` (Web) e `http://localhost:8000/docs` (API).

## Migrações de Banco de Dados
- Utilize Alembic para gerenciar mudanças no schema:
  `docker-compose exec api alembic revision --autogenerate -m "desc"`
  `docker-compose exec api alembic upgrade head`

## Monitoramento
- Acesse o Grafana em `http://localhost:3001` para métricas de GPU e latência.
- Logs centralizados podem ser visualizados via `docker-compose logs -f`.

## Recuperação de Desastre
- Backups do RDS são automatizados via módulo Terraform.
- Em caso de falha no Redis, os jobs pendentes permanecem no banco de dados para reprocessamento manual.
