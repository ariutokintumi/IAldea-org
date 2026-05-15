-- IAldea - Esquema de Base de Datos Inicial (Día 3)
-- Soporta: Kernel de Memoria, Grafo, Vectores y Anclaje eVVM

-- 1. Habilitar extensión de vectores
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Tabla de Miembros (Auth Gatekeeper)
CREATE TABLE IF NOT EXISTS memberships (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contributor_handle  TEXT NOT NULL UNIQUE,
    channel_ref_hash    TEXT NOT NULL UNIQUE, -- HMAC-SHA256(wa_id, salt)
    role_slug           TEXT NOT NULL,        -- ciudadano, secretaria, etc.
    access_level        SMALLINT NOT NULL,    -- 0 (ninguno), 1 (público), 2 (confidencial), 3 (privado)
    community_id        TEXT NOT NULL,
    active              BOOLEAN DEFAULT TRUE,
    enrolled_at         TIMESTAMPTZ DEFAULT now(),
    last_seen_at        TIMESTAMPTZ
);

-- 3. Tabla de Documentos (Kernel)
CREATE TABLE IF NOT EXISTS documents (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title               TEXT NOT NULL,
    uri                 TEXT NOT NULL,        -- Ruta o URL del documento
    category            TEXT NOT NULL,        -- acta, oficio, reglamento, etc.
    created_at          TIMESTAMPTZ DEFAULT now()
);

-- 4. Versiones de Documentos (Trazabilidad)
CREATE TABLE IF NOT EXISTS document_versions (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id         UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    version_number      INTEGER NOT NULL,
    content_hash        TEXT NOT NULL,        -- SHA-256 del contenido
    contributor_handle  TEXT NOT NULL REFERENCES memberships(contributor_handle),
    sensitivity         TEXT NOT NULL,        -- public, confidential, private
    status              TEXT DEFAULT 'active', -- active, under_review, archived
    created_at          TIMESTAMPTZ DEFAULT now()
);

-- 5. Fragmentos de Documentos (Vectores)
CREATE TABLE IF NOT EXISTS document_chunks (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id          UUID NOT NULL REFERENCES document_versions(id) ON DELETE CASCADE,
    content             TEXT NOT NULL,
    embedding           vector(1536),         -- Compatible con OpenAI text-embedding-3-small
    page_number         INTEGER,
    chunk_index         INTEGER NOT NULL,
    metadata            JSONB                 -- Metadatos adicionales (contexto, etiquetas)
);

-- 6. Anclajes Blockchain (Trust Layer - eVVM)
CREATE TABLE IF NOT EXISTS blockchain_anchors (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id          UUID NOT NULL REFERENCES document_versions(id) ON DELETE CASCADE,
    content_hash        TEXT NOT NULL,
    tx_hash             TEXT NOT NULL,        -- Hash de transacción en eVVM
    chain_id            INTEGER NOT NULL,     -- ID de red de eVVM
    anchored_at         TIMESTAMPTZ DEFAULT now(),
    verified            BOOLEAN DEFAULT FALSE
);

-- 7. Grafo de Conocimiento (Edges)
CREATE TABLE IF NOT EXISTS graph_edges (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_node_type    TEXT NOT NULL,        -- Person, Document, Committee, etc.
    source_node_id      TEXT NOT NULL,
    relation_type       TEXT NOT NULL,        -- belongs_to, validates, reviews, etc.
    target_node_type    TEXT NOT NULL,
    target_node_id      TEXT NOT NULL,
    metadata            JSONB,
    created_at          TIMESTAMPTZ DEFAULT now()
);

-- Índices para búsqueda rápida
CREATE INDEX IF NOT EXISTS idx_memberships_hash ON memberships(channel_ref_hash);
CREATE INDEX IF NOT EXISTS idx_chunks_embedding ON document_chunks USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_graph_source ON graph_edges(source_node_id);
CREATE INDEX IF NOT EXISTS idx_graph_target ON graph_edges(target_node_id);

-- Datos de prueba (Opcional - Primer Admin Técnico)
-- INSERT INTO memberships (contributor_handle, channel_ref_hash, role_slug, access_level, community_id)
-- VALUES ('admin_root', '00000000000000000000000000000000', 'admin_tecnico', 3, 'comunidad_ialdea_01');
