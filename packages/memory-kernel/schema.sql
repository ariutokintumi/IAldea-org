-- IAldea — Community Memory Kernel (SQLite)
-- Gantt Día 1–2: estructura de datos versionable y auditable.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS documents (
  id            TEXT PRIMARY KEY,
  title         TEXT NOT NULL,
  source_type   TEXT NOT NULL,
  mime_type     TEXT,
  file_sha256   TEXT,
  ingested_at   TEXT NOT NULL DEFAULT (datetime('now')),
  ingested_by   TEXT,
  metadata_json TEXT
);

CREATE TABLE IF NOT EXISTS document_versions (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id   TEXT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  version       INTEGER NOT NULL,
  storage_hint  TEXT,
  note          TEXT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (document_id, version)
);

CREATE TABLE IF NOT EXISTS chunks (
  id            TEXT PRIMARY KEY,
  document_id   TEXT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  page_start    INTEGER,
  page_end      INTEGER,
  chunk_index   INTEGER NOT NULL,
  text          TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_chunks_document ON chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_documents_ingested ON documents(ingested_at);

CREATE TABLE IF NOT EXISTS graph_nodes (
  id              TEXT PRIMARY KEY,
  node_type       TEXT NOT NULL,
  label           TEXT NOT NULL,
  properties_json TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS graph_edges (
  id          TEXT PRIMARY KEY,
  src_id      TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  dst_id      TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  relation    TEXT NOT NULL,
  properties_json TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_edges_src ON graph_edges(src_id);
CREATE INDEX IF NOT EXISTS idx_edges_dst ON graph_edges(dst_id);

CREATE TABLE IF NOT EXISTS audit_events (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type    TEXT NOT NULL,
  actor         TEXT,
  payload_json  TEXT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_events(created_at);
