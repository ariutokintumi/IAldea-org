"""
FastAPI: orquestación LangGraph para IAldea.
"""
from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel, Field

# Cargar .env desde la raíz del repo si existe
_repo_root = Path(__file__).resolve().parents[2]
_env = _repo_root / ".env"
if _env.is_file():
    load_dotenv(_env)

from graph_app import compiled_graph  # noqa: E402

app = FastAPI(title="IAldea LangGraph Orchestrator", version="0.1.0")


class InvokeIn(BaseModel):
    message: str = Field(..., min_length=1)
    role: str = Field(default="ciudadano")
    access_level: int = Field(default=1, ge=0, le=5)


class InvokeOut(BaseModel):
    response: str
    blocked_precheck: bool = False
    gather_failed: bool = False
    gather_error: str | None = None


@app.get("/health")
def health():
    return {"ok": True, "service": "langgraph-orchestrator"}


@app.post("/invoke", response_model=InvokeOut)
def invoke(body: InvokeIn):
    initial = {
        "message": body.message,
        "role": body.role.lower(),
        "access_level": body.access_level,
        "blocked": False,
    }
    out = compiled_graph.invoke(initial)
    blocked = bool(out.get("blocked"))
    response = out.get("response") or ""
    ge = out.get("gather_error")
    return InvokeOut(
        response=response,
        blocked_precheck=blocked,
        gather_failed=bool(ge),
        gather_error=str(ge)
        if ge and os.environ.get("IALDEA_EXPOSE_GATHER_ERRORS") == "1"
        else None,
    )
