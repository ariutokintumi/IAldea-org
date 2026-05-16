# Subagents API (FastAPI)

Capa HTTP **por contrato** sobre los subagentes. La lógica de dominio sigue en Node (`packages/agents/subagents`); este servicio reenvía a **`orchestrator-bridge`**.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/health` | Salud del servicio. |
| `GET` | `/agents` | Lista slugs desde el bridge (`GET /agents`). |
| `POST` | `/agents/{domain}/query` | Cuerpo: `{ "message": "...", "access_level": 1 }`. |

## Variables

| Variable | Descripción |
|----------|-------------|
| `ORCHESTRATOR_BRIDGE_URL` | Base del bridge (ej. `http://127.0.0.1:3011`). |

## Local

```bash
cd apps/subagents-api
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
export ORCHESTRATOR_BRIDGE_URL=http://127.0.0.1:3011
.venv/bin/uvicorn main:app --reload --port 3012
```

LangGraph y los gateways **no** requieren este servicio para el flujo principal; sirve para integraciones que quieran consultar **un solo dominio** por HTTP (contrato Pydantic).
