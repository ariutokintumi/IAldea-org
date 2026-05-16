# LangGraph — orquestador IAldea

Servicio **FastAPI** que ejecuta un grafo [LangGraph](https://langchain-ai.github.io/langgraph/):

1. **`precheck`** — rechazos *zero-token* con patrones de `refusal_patterns.yaml` (alineado a `tests/safety/refusals.md`).
2. **`orchestrator_profile`** — `POST /orchestrator/profile` en el [orchestrator-bridge](../orchestrator-bridge/): metadatos del **orquestador por rol** (protocolo, título, riesgo) sin ejecutar subagentes.
3. **`civic_memory`** — `POST /context` en el bridge: subagentes + Postgres + Conmutador (misma lógica que antes en un solo `/bundle`).
4. **`llm`** — respuesta con **Claude** y el mismo armado de system prompt que `packages/agents/router.js` (SOUL + refusals + protocolo de rol).

El client HTTP antiguo que solo llamaba `POST /bundle` sigue funcionando; LangGraph ahora separa **meta-orquestador** y **memoria** en dos llamadas al bridge.

## Variables

| Variable | Descripción |
|----------|-------------|
| `REPO_ROOT` | Repository root (for `docs/governance/IaAldea_SOUL.md` and `tests/safety/refusals.md`). |
| `ORCHESTRATOR_BRIDGE_URL` | Base URL del bridge (ej. `http://127.0.0.1:3011`). |
| `ANTHROPIC_API_KEY` | Clave Anthropic. |
| `ANTHROPIC_MODEL` | Opcional; default `claude-sonnet-4-6`. |
| `IALDEA_EXPOSE_GATHER_ERRORS` | Si es `1`, la respuesta de `/invoke` puede incluir `gather_error` cuando falle el bridge. |

## Local

```bash
cd apps/langgraph-orchestrator
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
export REPO_ROOT="$(cd ../.. && pwd)"
export ORCHESTRATOR_BRIDGE_URL=http://127.0.0.1:3011
.venv/bin/uvicorn main:app --reload --port 8000
```

## API

- `GET /health`
- `POST /invoke` — body JSON: `{ "message": "...", "role": "ciudadano", "access_level": 1 }`
- Respuesta: `{ "response": "...", "blocked_precheck": false, "gather_failed": false, "gather_error": null }` (`gather_error` solo si `IALDEA_EXPOSE_GATHER_ERRORS=1` en el entorno del servicio).

## Implementación

| Archivo | Rol |
|---------|-----|
| `graph_app.py` | `StateGraph`: `precheck` → `orchestrator_profile` → `civic_memory` → `llm`. |
| `main.py` | FastAPI: `/health`, `/invoke`. |
| `refusal_patterns.yaml` | Keywords → respuesta fija para `precheck` (sin LLM). |

## Consulta por un solo subagente (FastAPI aparte)

Para integraciones que quieren `POST /agents/{domain}/query` con contrato Pydantic, usar el servicio **[`apps/subagents-api`](../subagents-api/)** (puerto **3012** en Compose).

## Más documentación

- Raíz del repo: sección **LangGraph orchestrator** en [`README.md`](../../README.md) (diagramas, Compose, variables globales).
