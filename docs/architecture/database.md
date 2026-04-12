# Esquema Detalhado do Banco de Dados (PostgreSQL)

## Core: Usuários e Perfis
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    status TEXT DEFAULT 'active', -- active, suspended, deleted
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    avatar_url TEXT,
    bio TEXT,
    preferences JSONB DEFAULT '{}',
    country TEXT,
    timezone TEXT
);
```

## Identidade Vocal e Consentimento
```sql
CREATE TABLE voice_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    name TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, processing, active, failed
    fidelity_score FLOAT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE voice_samples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    voice_profile_id UUID NOT NULL REFERENCES voice_profiles(id),
    file_url TEXT NOT NULL,
    duration_sec FLOAT,
    quality_score FLOAT,
    sample_type TEXT, -- guided_phrase, freestyle
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE voice_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    voice_profile_id UUID NOT NULL REFERENCES voice_profiles(id),
    version TEXT NOT NULL,
    embedding_vector_ref TEXT NOT NULL, -- Ref to S3/Storage
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE consent_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    voice_profile_id UUID NOT NULL REFERENCES voice_profiles(id),
    document_url TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    accepted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    revoked_at TIMESTAMP WITH TIME ZONE
);
```

## Projetos Musicais
```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    status TEXT DEFAULT 'draft', -- draft, generating, ready, failed
    genre TEXT,
    bpm INTEGER,
    mood TEXT,
    key_signature TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE lyrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id),
    raw_text TEXT NOT NULL,
    structured_json JSONB, -- { verses: [], chorus: [] }
    language TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE melody_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id),
    midi_url TEXT,
    audio_preview_url TEXT,
    is_selected BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE vocal_renders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id),
    voice_profile_id UUID NOT NULL REFERENCES voice_profiles(id),
    file_url TEXT,
    render_type TEXT, -- preview, final
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Faturamento e Créditos
```sql
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price_cents INTEGER NOT NULL,
    currency TEXT DEFAULT 'BRL',
    credits_included INTEGER NOT NULL,
    features JSONB
);

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    plan_id UUID NOT NULL REFERENCES plans(id),
    provider_id TEXT, -- Stripe Subscription ID
    status TEXT, -- active, canceled, past_due
    current_period_end TIMESTAMP WITH TIME ZONE
);

CREATE TABLE credit_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    delta INTEGER NOT NULL, -- positivo para compra, negativo para uso
    reason TEXT,
    project_id UUID REFERENCES projects(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
