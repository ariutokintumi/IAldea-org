# Faltantes / siguiente iteración

## LangGraph + FastAPI (orquestación)

**Visión de arquitectura:** **LangGraph** como capa que **orquesta a todos los orquestadores por rol** (flujos, ramas y política entre `orc_*`). **FastAPI** como capa HTTP de **subagentes** (microservicio por dominio o un app con routers `/agents/{domain}/query`), con contratos Pydantic y paso por Conmutador para plaintext solo tras policy.

**Qué hay hoy en el repo:** un **solo** servicio Python `apps/langgraph-orchestrator` (FastAPI + grafo lineal `precheck → gather → llm`) más el **bridge Node** `apps/orchestrator-bridge`, que ejecuta los subagentes ya escritos en Node. No hay todavía FastAPI por subagente ni un grafo LangGraph que enlace explícitamente un nodo por cada orquestador de rol.

- **LangGraph (Python):** servicio `apps/langgraph-orchestrator` (+ puente `apps/orchestrator-bridge`) — ver [README](../../apps/langgraph-orchestrator/README.md).
- **FastAPI (Python) por subagente (pendiente):** un **microservicio por subagente** (o un solo app con routers `/agents/{domain}/query`) que exponga: contexto permitido, llamada al LLM interno si aplica, y delegación al Conmutador para plaintext solo tras policy. Ventaja: mismo stack que LangGraph y tipado de contratos (Pydantic).
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
