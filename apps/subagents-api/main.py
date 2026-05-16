"""
FastAPI: superficie HTTP por subagente (dominio).
Delega la ejecución en orchestrator-bridge (Node): lógica real en packages/agents/subagents.
"""
from __future__ import annotations

import os
from pathlib import Path

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

_repo_root = Path(__file__).resolve().parents[2]
_env = _repo_root / ".env"
if _env.is_file():
    load_dotenv(_env)

BRIDGE_URL = os.environ.get("ORCHESTRATOR_BRIDGE_URL", "http://127.0.0.1:3011").rstrip("/")

app = FastAPI(title="IAldea Subagents API", version="0.1.0")


class AgentQueryIn(BaseModel):
    message: str = Field(..., min_length=1)
    access_level: int = Field(default=1, ge=0, le=5)


@app.get("/health")
def health():
    return {"ok": True, "service": "subagents-api"}


@app.get("/agents")
async def list_agents():
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            r = await client.get(f"{BRIDGE_URL}/agents")
            r.raise_for_status()
            return r.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"bridge_unreachable: {e!s}") from e


@app.post("/agents/{domain}/query")
async def query_agent(domain: str, body: AgentQueryIn):
    domain_slug = domain.strip().lower()
    try:
        async with httpx.AsyncClient(timeout=120.0) as client:
            r = await client.post(
                f"{BRIDGE_URL}/agents/{domain_slug}/query",
                json={"message": body.message, "accessLevel": body.access_level},
            )
            if r.status_code == 404:
                raise HTTPException(status_code=404, detail="unknown_domain")
            r.raise_for_status()
            return r.json()
    except HTTPException:
        raise
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"bridge_error: {e!s}") from e
