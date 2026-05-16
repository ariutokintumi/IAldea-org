# LangGraph — orquestador IAldea

Servicio **FastAPI** que ejecuta un grafo [LangGraph](https://langchain-ai.github.io/langgraph/):

1. **`precheck`** — rechazos *zero-token* con patrones de `refusal_patterns.yaml` (alineado a `tests/safety/refusals.md`).
2. **`gather`** — `POST /bundle` en el [orchestrator-bridge](../orchestrator-bridge/) (Node: subagentes, PG, Conmutador).
3. **`llm`** — respuesta con **Claude** y el mismo armado de system prompt que `packages/agents/router.js` (SOUL + refusals + protocolo de rol).

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
| `graph_app.py` | `StateGraph`: nodos `precheck`, `gather`, `llm`; estado `OrchestratorState`; llamada HTTP al bridge. |
| `main.py` | FastAPI: `/health`, `/invoke`. |
| `refusal_patterns.yaml` | Keywords → respuesta fija para `precheck` (sin LLM). |

## Más documentación

- Raíz del repo: sección **LangGraph orchestrator** en [`README.md`](../../README.md) (diagramas, Compose, variables globales).
