# Backlog Técnico Detalhado

## Frontend (Next.js + Tailwind)
- [ ] Configurar layout base com `shadcn/ui`.
- [ ] Implementar componentes de Web Audio para gravação de voz.
- [ ] Criar visualizador de Waveform para amostras gravadas.
- [ ] Desenvolver editor de letras com suporte a seções (Verso/Refrão).
- [ ] Implementar Timeline visual para o editor de música (Preview).
- [ ] Integrar Context API ou Redux para estado global do projeto.
- [ ] Configurar PWAs para acesso rápido no mobile via browser.

## Backend (FastAPI + PostgreSQL)
- [ ] Configurar SQLAlchemy/SQLModel com migrações Alembic.
- [ ] Implementar middleware de autenticação JWT.
- [ ] Criar abstração para Object Storage (S3/R2 Wrapper).
- [ ] Desenvolver lógica de Ledger de Créditos (Atomic updates).
- [ ] Configurar Celery com Redis para gestão de jobs assíncronos.
- [ ] Implementar Webhooks para notificações de conclusão de processamento.
- [ ] Criar endpoints de exportação com geração de URLs temporárias.

## IA & Workers (Python + PyTorch)
- [ ] Implementar worker de análise de áudio (SNR, Clipping, Silêncio).
- [ ] Configurar pipeline de treinamento de Voice Embedding (RVC ou similar).
- [ ] Otimizar inferência do Singing Engine para execução em GPU (Triton ou ONNX).
- [ ] Desenvolver integração com LLMs para sugestão/refinamento de letras.
- [ ] Criar serviço de mixagem automática (Normalização, Limiter, EQ básico).
- [ ] Implementar sistema de "Watermarking" em áudios gerados para segurança.

## Infra & DevOps
- [ ] Configurar Docker Compose para ambiente de desenvolvimento.
- [ ] Criar Helm Charts para deploy em Kubernetes.
- [ ] Implementar pipeline de CI/CD (GitHub Actions) com linting e testes.
- [ ] Configurar monitoramento de GPU e métricas de latência.
- [ ] Centralização de logs com ELK ou Grafana Loki.
