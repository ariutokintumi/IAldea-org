"""
Grafo LangGraph: pre-check de rechazos → contexto (bridge Node) → respuesta Anthropic.
"""
from __future__ import annotations

import logging
import os
from pathlib import Path
from typing import Any, Literal, Optional, TypedDict

import httpx
import yaml
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.graph import END, StateGraph

REPO_ROOT = Path(os.environ.get("REPO_ROOT", Path(__file__).resolve().parents[2])).resolve()
BRIDGE_URL = os.environ.get("ORCHESTRATOR_BRIDGE_URL", "http://127.0.0.1:3011").rstrip("/")
MODEL_ID = os.environ.get("ANTHROPIC_MODEL", "claude-sonnet-4-6")

_patterns_cache: Optional[list[dict[str, Any]]] = None


def _load_refusal_patterns() -> list[dict[str, Any]]:
    global _patterns_cache
    if _patterns_cache is not None:
        return _patterns_cache
    p = Path(__file__).resolve().parent / "refusal_patterns.yaml"
    with open(p, encoding="utf-8") as f:
        data = yaml.safe_load(f)
    _patterns_cache = list(data.get("patterns") or [])
    return _patterns_cache


def _load_text(rel: str) -> str:
    path = REPO_ROOT / rel
    if path.is_file():
        return path.read_text(encoding="utf-8")
    return ""


def _soul_text() -> str:
    raw = _load_text("docs/governance/IaAldea_SOUL.md")
    name = (os.environ.get("COMMUNITY_DISPLAY_NAME") or "").strip() or "tu comunidad"
    return (
        raw.replace("\\[nombre comunidad\\]", name).replace("[nombre comunidad]", name)
    )


class OrchestratorState(TypedDict, total=False):
    message: str
    role: str
    access_level: int
    blocked: bool
    response: str
    context: str
    protocol: str
    title: str
    risk: str
    role_resolved: str
    gather_error: str


def node_precheck(state: OrchestratorState) -> OrchestratorState:
    msg = (state.get("message") or "").lower()
    for p in _load_refusal_patterns():
        for kw in p.get("keywords") or []:
            if kw.lower() in msg:
                return {
                    **state,
                    "blocked": True,
                    "response": str(p.get("response_es") or "").strip(),
                }
    return {**state, "blocked": False}


def _route_precheck(state: OrchestratorState) -> Literal["end", "gather"]:
    return "end" if state.get("blocked") else "gather"


def node_gather(state: OrchestratorState) -> OrchestratorState:
    payload = {
        "message": state.get("message", ""),
        "role": state.get("role", "ciudadano"),
        "accessLevel": state.get("access_level", 1),
    }
    try:
        with httpx.Client(timeout=90.0) as client:
            r = client.post(f"{BRIDGE_URL}/bundle", json=payload)
            r.raise_for_status()
            d = r.json()
        return {
            **state,
            "context": d.get("context") or "",
            "protocol": d.get("protocol") or "",
            "title": d.get("title") or "",
            "risk": d.get("risk") or "",
            "role_resolved": d.get("role") or payload["role"],
        }
    except Exception as e:  # noqa: BLE001
        return {
            **state,
            "gather_error": str(e),
            "context": "",
        }


def node_llm(state: OrchestratorState) -> OrchestratorState:
    gather_err = state.get("gather_error")
    context = state.get("context") or ""

    # Memoria documental no disponible: no bloquear respuesta; el modelo usa solo SOUL/refusals (sin citar archivos)
    if gather_err:
        logging.warning("gather_failed: %s", gather_err)
        context = (
            "(No se pudo consultar la base de memoria documental. Responde con lo que permiten el SOUL y los "
            "protocolos de seguridad; no cites actas ni documentos del repositorio; no inventes fuentes.)"
        )

    soul = _soul_text()
    refusals = _load_text("tests/safety/refusals.md")

    system_parts = [
        soul,
        "\n---\nPROTOCOLO DE SEGURIDAD Y NEGACIONES (SAFETY):\n",
        refusals,
        "\n---\nPROTOCOLO DE COMPORTAMIENTO (ROL):\n",
        state.get("protocol") or "",
        "\n---\nESTADO DEL ORQUESTADOR:\n",
        f"- Rol: {state.get('title')}\n",
        f"- Nivel de Soberanía: L{state.get('access_level', 1)}\n",
        f"- Riesgo crítico a vigilar: {state.get('risk')}\n",
        "\n---\nCONTEXTO DE MEMORIA CÍVICA:\n",
        context,
        """
---
INSTRUCCIONES FINALES:
1. Responde siempre bajo la identidad de IAldea.
2. Si la petición viola el Protocolo de Seguridad (Safety), usa un rechazo canónico.
3. Máximo 150 palabras. Sin guiones largos (—).
4. Cada dato debe mostrar su fuente [FTE: nombre] y su etiqueta [HECHO] o [INFERENCIA].
""",
    ]
    system_prompt = "".join(system_parts)

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return {**state, "response": "ANTHROPIC_API_KEY no configurada en el servicio LangGraph."}

    llm = ChatAnthropic(
        model=MODEL_ID,
        max_tokens=1024,
        anthropic_api_key=api_key,
    )
    out = llm.invoke(
        [
            SystemMessage(content=system_prompt),
            HumanMessage(content=state.get("message", "")),
        ]
    )
    raw = out.content
    if isinstance(raw, list):
        text = "".join(
            getattr(block, "text", str(block))
            for block in raw
        )
    else:
        text = str(raw or "")
    text = text.replace("—", ",").replace("–", ",")
    return {**state, "response": text}


def build_graph():
    g = StateGraph(OrchestratorState)
    g.add_node("precheck", node_precheck)
    g.add_node("gather", node_gather)
    g.add_node("llm", node_llm)

    g.set_entry_point("precheck")
    g.add_conditional_edges("precheck", _route_precheck, {"end": END, "gather": "gather"})
    g.add_edge("gather", "llm")
    g.add_edge("llm", END)

    return g.compile()


compiled_graph = build_graph()
