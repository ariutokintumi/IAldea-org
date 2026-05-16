# LangGraph — orquestador IAldea

Servicio **FastAPI** que ejecuta un grafo [LangGraph](https://langchain-ai.github.io/langgraph/):

1. **`precheck`** — rechazos *zero-token* con patrones de `refusal_patterns.yaml` (alineado a `tests/safety/refusals.md`).
2. **`gather`** — `POST /bundle` en el [orchestrator-bridge](../orchestrator-bridge/) (Node: subagentes, PG, Conmutador).
3. **`llm`** — respuesta con **Claude** y el mismo armado de system prompt que `packages/agents/router.js` (SOUL + refusals + protocolo de rol).

## Variables

| Variable | Descripción |
|----------|-------------|
| `REPO_ROOT` | Raíz del repo (para leer `IaAldea_SOUL.md` y `tests/safety/refusals.md`). |
| `ORCHESTRATOR_BRIDGE_URL` | Base URL del bridge (ej. `http://127.0.0.1:3011`). |
| `ANTHROPIC_API_KEY` | Clave Anthropic. |
| `ANTHROPIC_MODEL` | Opcional; default `claude-sonnet-4-6`. |

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
- Respuesta: `{ "response": "...", "blocked_precheck": false }`
