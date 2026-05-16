# Faltantes / siguiente iteración

## LangGraph + FastAPI (orquestación)

**Visión de arquitectura:** **LangGraph** como capa que **orquesta a todos los orquestadores por rol** (flujos, ramas y política entre `orc_*`). **FastAPI** como capa HTTP de **subagentes** (microservicio por dominio o un app con routers `/agents/{domain}/query`), con contratos Pydantic y paso por Conmutador para plaintext solo tras policy.

**Qué hay hoy en el repo:**

- **`apps/langgraph-orchestrator`:** FastAPI + grafo LangGraph (`precheck` → perfil de rol en bridge → contexto cívico en bridge → LLM). Ver [`graph_app.py`](../../apps/langgraph-orchestrator/graph_app.py).
- **`apps/orchestrator-bridge`:** Node; rutas `POST /orchestrator/profile`, `POST /context`, `POST /bundle`, `GET /agents`, `POST /agents/:domain/query`.
- **`apps/subagents-api`:** FastAPI en **:3012**; `POST /agents/{domain}/query` con proxy al bridge (contrato Pydantic hacia el exterior).

**Pendiente (roadmap):** reescribir subagentes en Python/FastAPI autónomos o añadir subgrafos LangGraph **por rol** si hace falta ramificación más rica que el config único inyectado hoy.

- **Integración con lo actual:** mantener **Node** (WhatsApp webhook / whatsapp-web.js) como borde; **validar rol y L1–L4 en Node** antes de llamar a LangGraph; LangGraph/FastAPI **no** sustituyen el control de acceso.

## Contexto y primera subida de documentos

- Flujo ingesta → chunks → embeddings → PostgreSQL (`document_chunks`, `document_versions`) según `packages/kernel` / `packages/ingesta`.
- Cifrado al reposo: contenido sensible cifrado con **keychain por nivel** (`CONMUTADOR_KEY_L1`…); el **conmutador-service** (`:3005`) descifra solo si el nivel del solicitante es suficiente.

## Dónde vive la memoria

| Qué | Dónde (actual) |
|-----|----------------|
| Memoria vectorial / chunks | PostgreSQL (`document_chunks` + pgvector o embedding en query) vía `packages/kernel/db` |
| Identidad WhatsApp | `packages/security/identity` + hash de teléfono |
| Cifrado por nivel | `packages/security/keychain` + `apps/conmutador-service` |
| Sesión / estado conversación | Hoy: sin grafo persistente; LangGraph puede usar Postgres checkpointer |

## Ejecutar en local vs VM

| Entorno | Uso |
|---------|-----|
| **Local** | Desarrollo: Postgres + conmutador + gateway WhatsApp + (futuro) LangGraph + FastAPI agents |
| **VM / VPS** | Piloto comunitario: mismos servicios en Docker/Compose, TLS frente al mundo, secretos en variables o vault |

---

*Actualizar cuando existan mejoras al verifier post-LLM o checkpointer Postgres.*
