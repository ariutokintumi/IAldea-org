# Faltantes / siguiente iteración

## LangGraph + FastAPI (orquestación)

- **LangGraph (Python):** grafo de estados para el **orquestador** (routing por intención, memoria de conversación, handoff entre “modos” o herramientas). Encaja como **servicio aparte** que el gateway Node llama por HTTP, o sustituye gradualmente la lógica lineal de `packages/agents/router.js`.
- **FastAPI (Python):** un **microservicio por subagente** (o un solo app con routers `/agents/{domain}/query`) que expone: contexto permitido, llamada al LLM interno, y delegación al Conmutador para plaintext solo tras policy. Ventaja: mismo stack que LangGraph y tipado de contratos (Pydantic).
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

*Actualizar cuando exista el primer commit de `apps/langgraph-orchestrator` y `apps/subagent-api` (FastAPI).*
