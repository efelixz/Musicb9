# Voicify (Nome Provisório) - Plataforma de Música com IA

## Visão Geral
Este repositório contém o ecossistema completo da plataforma Voicify, permitindo aos usuários cadastrar sua própria voz, enviar letras, gerar melodias e criar músicas completas com identidade vocal personalizada.

## Estrutura do Repositório
- `apps/`: Aplicações (Web, Mobile, Admin, API)
- `packages/`: Pacotes compartilhados (UI, Types, Auth, etc)
- `services/`: Motores de IA e serviços especializados
- `infra/`: Configurações de infraestrutura (Terraform, K8s)
- `docs/`: Documentação técnica e de produto

## Tech Stack
- **Frontend:** Next.js + TypeScript
- **Mobile:** React Native + Expo
- **Backend:** FastAPI + Python
- **Banco de Dados:** PostgreSQL
- **Cache/Filas:** Redis + Celery
- **Storage:** S3 / R2

## Documentação
Veja a pasta `/docs` para detalhes sobre:
- [Visão do Produto](/docs/product/vision.md)
- [Arquitetura](/docs/architecture/README.md)
- [Backlog e Roadmap](/docs/product/roadmap.md)
- [Especificação de API](/docs/api/README.md)
