# Planejamento de Sprints (MVP)

## Sprint 1: Fundação e Autenticação
- **Objetivo:** Estabelecer infraestrutura básica e login.
- **Entregáveis:**
    - Setup do repositório (Monorepo).
    - API base com FastAPI + Migrações iniciais.
    - Fluxo de Cadastro/Login no Web App.
    - Landing page inicial.

## Sprint 2: Onboarding e Voz (Fase 1)
- **Objetivo:** Coleta de voz e consentimento.
- **Entregáveis:**
    - Fluxo legal de consentimento (Checkbox + PDF).
    - Interface de gravação de amostras guiadas.
    - Upload de áudio para S3/R2.
    - Worker de processamento inicial de áudio (Análise de qualidade).

## Sprint 3: IA Vocal e Perfil
- **Objetivo:** Criação da identidade vocal.
- **Entregáveis:**
    - Integração com motor de treinamento de voz (POC).
    - Geração de embeddings vocais.
    - Dashboard "Minha Voz" com métricas de fidelidade.

## Sprint 4: Criação Musical (Letra e Melodia)
- **Objetivo:** Fluxo inicial de projeto.
- **Entregáveis:**
    - Editor de letras simples.
    - Integração com IA de geração de melodia (MIDI/Preview).
    - Interface de seleção de estilo e emoção.

## Sprint 5: Singing Engine e Renderização
- **Objetivo:** A "Mágica" — voz do usuário cantando.
- **Entregáveis:**
    - Pipeline de inferência (Melodia + Embedding -> Vocal Cantado).
    - Player de preview de música gerada.
    - Fila de processamento assíncrono para renderização pesada.

## Sprint 6: Exportação e Monetização
- **Objetivo:** Fechamento do ciclo e Billing.
- **Entregáveis:**
    - Render final e exportação (MP3/WAV).
    - Integração com Stripe (Planos e Créditos).
    - Histórico de projetos e downloads.
