# Especificação da API REST

## 1. Autenticação e Usuários
### `POST /auth/register`
- **Descrição:** Cria uma nova conta de usuário.
- **Payload:** `{ email, password, full_name }`
- **Resposta:** `{ user_id, token }`

### `POST /auth/login`
- **Descrição:** Autentica o usuário e retorna token JWT.
- **Payload:** `{ email, password }`
- **Resposta:** `{ token, user }`

---

## 2. Identidade Vocal (Voice Cloning)
### `POST /voices/clone`
- **Descrição:** Inicia o processo de clonagem vocal com amostras enviadas.
- **Payload (Multipart):** `{ name, samples: File[] }`
- **Resposta:** `{ voice_id, status: 'processing' }`

### `GET /voices`
- **Descrição:** Lista perfis vocais do usuário.
- **Resposta:** `{ voices: VoiceProfile[] }`

### `GET /voices/{id}`
- **Descrição:** Detalhes de um perfil vocal e score de fidelidade.

---

## 3. Gestão de Projetos
### `POST /projects`
- **Descrição:** Cria um novo projeto musical.
- **Payload:** `{ title, genre, mood, bpm }`
- **Resposta:** `{ project_id }`

### `GET /projects`
- **Descrição:** Lista projetos do usuário.

### `PATCH /projects/{id}`
- **Descrição:** Atualiza metadados do projeto.

---

## 4. Criação e IA
### `POST /projects/{id}/lyrics`
- **Descrição:** Salva ou atualiza a letra do projeto.
- **Payload:** `{ raw_text }`

### `POST /projects/{id}/generate-melody`
- **Descrição:** Solicita opções de melodia para a letra.
- **Resposta:** `{ job_id, options: [] }`

### `POST /projects/{id}/render-vocal`
- **Descrição:** Aplica a voz do usuário à melodia selecionada.
- **Payload:** `{ voice_id, melody_id }`
- **Resposta:** `{ job_id, status: 'queued' }`

---

## 5. Exportação e Assets
### `GET /projects/{id}/renders`
- **Descrição:** Lista renderizações (previews e finais) do projeto.

### `POST /projects/{id}/export`
- **Descrição:** Gera o arquivo final para download (MP3/WAV/Stems).
- **Payload:** `{ format, include_stems }`

---

## 6. Billing e Créditos
### `GET /billing/plans`
- **Descrição:** Retorna planos disponíveis.

### `GET /billing/credits`
- **Descrição:** Saldo atual de créditos do usuário.

### `POST /billing/subscribe`
- **Descrição:** Inicia checkout de assinatura.
