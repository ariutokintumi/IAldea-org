# Guía definitiva del repositorio — Fase Pop-Up, **solo Día 1 y Día 2**

Este archivo es la **fuente de verdad** para qué debe vivir en el repo **mientras cerramos Día 1 y Día 2**. Todo lo demás (ingesta, API, grafo, red-team, PDFs, capas GIS, latitudes, etc.) **no** se versiona aquí todavía: evita ruido y cumple entregables por etapa. El calendario completo sigue en [`CONTEXTO-POPUP-VILLAGE.md`](CONTEXTO-POPUP-VILLAGE.md) §10.

---

## Alcance permitido en el árbol (D1 + D2)

### Día 1 — Visión, límites y ética

**Foco:** qué es y qué no es IAldea; primer borrador de voz y límites; seguridad cívica.

**Archivos que deben existir y mantenerse al día:**

| Ruta | Rol |
|------|-----|
| [`docs/principles.md`](docs/principles.md) | Principios del proyecto. |
| [`docs/civic-safety.md`](docs/civic-safety.md) | Taxonomía y casos prohibidos. |
| [`docs/vision.md`](docs/vision.md) | Visión pública / producto. |
| [`docs/privacy.md`](docs/privacy.md) | Postura de privacidad (alineada a CONTEXTO §12). |
| [`soul/SOUL.example.md`](soul/SOUL.example.md) | Ejemplo humano-leíble (referencia para comunidades). |
| [`soul/SOUL.community-template.md`](soul/SOUL.community-template.md) | Plantilla descargable para `SOUL.md`. |
| `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md` | Gobierno del repo (raíz). |
| [`CONTEXTO-POPUP-VILLAGE.md`](CONTEXTO-POPUP-VILLAGE.md) | Documento maestro (no recortar; es contexto global). |
| [`README.md`](README.md) | Puerta de entrada al proyecto. |

**Opcional Día 1 (si el equipo ya lo creó):** `docs/positioning-v1.md`, `docs/pop-up-2026/day-1.md` (minuta). Si no existen, el scribe los añade cuando toque.

**Explícitamente fuera de alcance D1:** scripts de ingesta, datos geoespaciales, PDFs de anuarios, notebooks, `.venv-*`, carpetas `metadatos/`, `derivados/`, `conjunto_de_datos/` (mantener fuera del git o solo en `.gitignore`).

---

### Día 2 — Modelo de comunidad, roles y permisos

**Foco:** roles, permisos, niveles de acceso, modos de privacidad, canal ciudadano (**WhatsApp**), matriz CSV, historias de usuario, YAML de ejemplo, configurador no-code MVP.

**Archivos y carpetas que deben existir:**

| Ruta | Rol |
|------|-----|
| [`docs/planning/dia_02_gobernanza_roles_y_accesos.md`](docs/planning/dia_02_gobernanza_roles_y_accesos.md) | Plan de taller Día 2 (único plan en `docs/planning/` por ahora). |
| [`docs/planning/README.md`](docs/planning/README.md) | Índice mínimo que apunta solo a `dia_02`. |
| [`docs/roles/README.md`](docs/roles/README.md) | Índice de roles. |
| [`docs/roles/permission-matrix.csv`](docs/roles/permission-matrix.csv) | Matriz **Etapa × Rol** (canónica). |
| [`docs/roles/role-model.md`](docs/roles/role-model.md) | Resumen de slugs. |
| [`docs/roles/user-stories.md`](docs/roles/user-stories.md) | Historias de validación. |
| [`config/policy_config.example.yaml`](config/policy_config.example.yaml) | Política machine-enforceable + `channels.whatsapp`. |
| [`config/roles.example.yaml`](config/roles.example.yaml) | Roles por cargo (ejemplo). |
| [`apps/web/configurator/`](apps/web/configurator/) | Asistente estático 7 pasos (Módulo D MVP). |
| [`packages/agents/README.md`](packages/agents/README.md) | Tubería conceptual ciudadanía / gobernanza. |
| [`packages/agents/citizen.md`](packages/agents/citizen.md) | Contrato perfil ciudadanía. |
| [`packages/agents/authority.md`](packages/agents/authority.md) | Contrato perfil gobernanza. |
| [`docs/architecture.md`](docs/architecture.md) | **Stub** hasta Día 3: enlace al CONTEXTO §11 (sin diagramas largos en este repo por ahora). |

**Opcional Día 2:** `docs/pop-up-2026/day-2.md`, `examples/fictional-community/community-schema.json` (cuando el equipo lo redacte).

**Explícitamente fuera de alcance D2:** `apps/api/`, `packages/memory-kernel/`, `packages/graph/`, `packages/retrieval/`, `packages/civic-safety/`, `packages/connectors/`, `packages/audit-log/`, `scripts/*.py` de ingesta, suites `tests/*` de Día 6, planes `plan_01`, `plan_08`, etc. (volverán cuando toque el día correspondiente).

---

## Árbol objetivo (resumen)

```
/
├── CONTEXTO-POPUP-VILLAGE.md
├── reestructura.md              ← esta guía
├── README.md, LICENSE, …
├── docs/
│   ├── vision.md, principles.md, civic-safety.md, privacy.md
│   ├── architecture.md        ← stub Día 3
│   ├── README.md
│   ├── planning/
│   │   ├── README.md
│   │   └── dia_02_gobernanza_roles_y_accesos.md
│   └── roles/                 ← CSV + role-model + user-stories
├── soul/
├── config/
├── apps/web/configurator/
└── packages/agents/
```

---

## Cómo usar esta guía

1. Antes de añadir un archivo, preguntar: **¿es salida de Día 1 o Día 2 según CONTEXTO §10?** Si no, no entra (o va a otra rama / issue).
2. Los experimentos locales (PDF INEGI, GeoTIFF, latitudes) **no** se suben: usar `.gitignore` y material de demo en el día que corresponda.
3. Al abrir **Día 3**, se amplía esta guía o se sustituye por una nueva sección; hasta entonces, **no** expandir el árbol más allá de lo listado arriba.

---

*Versión 1.0 — repo alineado a entregables Día 1–2 únicamente.*
