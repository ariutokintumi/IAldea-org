# Guía definitiva del repo — Días 1, 2 y 3 (CONTEXTO §10)

Calendario completo del Pop-Up: [`CONTEXTO-POPUP-VILLAGE.md`](../../CONTEXTO-POPUP-VILLAGE.md) §10. Recordatorio diario del equipo: [`guia-diaria.md`](guia-diaria.md).

Este archivo lista **únicamente** lo que debe estar versionado al **cierre del Día 2**. Cualquier otro archivo o carpeta (arquitectura detallada, agentes, `apps/web`, ingesta, GIS, PDF, etc.) **no** entra hasta su día en el CONTEXTO.

---

## Día 1 — Visión, límites y ética


| Ruta obligatoria (CONTEXTO)                              | Estado                             |
| -------------------------------------------------------- | ---------------------------------- |
| [`../foundation/principles.md`](../foundation/principles.md)               | ✓                                  |
| [`../governance/IaAldea_SOUL.md`](../governance/IaAldea_SOUL.md)                 | ✓ SOUL del colaborador (`docs/governance/`) |
| [`../foundation/civic-safety.md`](../foundation/civic-safety.md)           | ✓                                  |
| [`../foundation/positioning-v1.md`](../foundation/positioning-v1.md)       | Posicionamiento público (borrador) |
| [`../pop-up-2026/day-1.md`](../pop-up-2026/day-1.md) | Minuta Día 1                       |
| [`../foundation/privacy.md`](../foundation/privacy.md)                     | Modos de privacidad                |
| [`../foundation/vision.md`](../foundation/vision.md)                       | Visión                             |


Raíz del repo: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `README.md`, `LICENSE`, **`CONTEXTO-POPUP-VILLAGE.md`**, `Makefile`, `docker-compose.yml`. Documentación: `docs/` con `project/` (esta guía, `guia-diaria`), `foundation/`, `governance/`, `architecture/`, etc.

---

## Día 2 — Modelo de comunidad y roles


| Ruta obligatoria (CONTEXTO)                                                                                | Estado                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`../roles/role-model.md`](../roles/role-model.md)                                                     | ✓                                                                                                                                                                                        |
| [`../../config/roles.example.yaml`](../../config/roles.example.yaml)                                                   | ✓                                                                                                                                                                                        |
| [`../roles/permission-matrix.csv`](../roles/permission-matrix.csv)                                     | ✓                                                                                                                                                                                        |
| [`../roles/role-model-permission-matrix-full.csv`](../roles/role-model-permission-matrix-full.csv)     | Export hoja *Role Model + Permission Matrix* (columnas UX; lectura en [roles-por-etapa.md](../roles/roles-por-etapa.md) / [user-stories-matriz.md](../roles/user-stories-matriz.md)) |
| [`../roles/Role Model + Permission Matrix - IAldea.xlsx`](../roles/Role%20Model%20+%20Permission%20Matrix%20-%20IAldea.xlsx) | Libro Excel (todas las pestañas); alinear CSV del repo al volver a exportar desde Sheets |
| [`../../examples/fictional-community/community-schema.json`](../../examples/fictional-community/community-schema.json) | Esquema ficticio (menos de 500 hab.; ejemplo numérico ~450)                                                                                                                                                               |
| [`../roles/user-stories.md`](../roles/user-stories.md)                                                 | ✓                                                                                                                                                                                        |
| [`../roles/user-stories-por-rol.csv`](../roles/user-stories-por-rol.csv)                               | Pestaña *UserStories por rol* (export; lectura [user-stories-por-rol.md](../roles/user-stories-por-rol.md))                                                                            |
| [`../roles/excel-sheets.md`](../roles/excel-sheets.md) | Índice pestañas Excel ↔ CSV (regenerable con `scripts/export_role_model_excel.py`) |
| [`../pop-up-2026/day-2.md`](../pop-up-2026/day-2.md)                                                   | Minuta Día 2                                                                                                                                                                             |
| [`../../config/policy_config.example.yaml`](../../config/policy_config.example.yaml)                                   | Política machine-enforceable                                                                                                                                                             |
| [`../planning/dia_02_gobernanza_roles_y_accesos.md`](../planning/dia_02_gobernanza_roles_y_accesos.md) | Taller Día 2 (detalle; no sustituye CSV/YAML)                                                                                                                                            |
| [`../planning/README.md`](../planning/README.md)                                                       | Índice planning                                                                                                                                                                          |


---

## Día 3 — Arquitectura de memoria

| Ruta | Estado |
|---|---|
| [`../architecture/system-architecture.md`](../architecture/system-architecture.md) | ✅ Día 3 — 4 capas, data model, grafo, ingesta, subagentes (+ notas Día 4+ en el mismo doc) |
| [`../planning/dia_03_plan_maestro_arquitectura.md`](../planning/dia_03_plan_maestro_arquitectura.md) | ✅ Plan Maestro: Memoria, Orquestación, eVVM y Fases Técnicas |
| [`../pop-up-2026/day-3.md`](../pop-up-2026/day-3.md) | ✅ Minuta Día 3 |

---

## Explícitamente **fuera** del repo en D1–D3

- `packages/agents/*`, `apps/web/*`, prototipo chat → **Día 4**
- Scripts de ingesta, Kernel, grafo, vectores (implementación) → **Día 4+**
- Red-team, tests de seguridad → **Día 6**
- Datos pesados: PDF anuarios, GeoTIFF, `metadatos/`, `derivados/` → `.gitignore`

---

## Árbol al cierre del Día 3 (organización actual)

```
/
├── README.md, LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md
├── CONTEXTO-POPUP-VILLAGE.md
├── Makefile, docker-compose.yml, .env.example
├── docs/
│   ├── README.md
│   ├── project/
│   │   ├── repo-structure.md
│   │   └── guia-diaria.md
│   ├── foundation/
│   │   ├── vision.md, principles.md, civic-safety.md, privacy.md, positioning-v1.md
│   ├── governance/
│   │   ├── IaAldea_SOUL.md
│   │   └── SOUL-outline.md
│   ├── memory/
│   │   ├── Episodic.md, Public-sources.md, Source-hierarchy.md
│   ├── architecture/
│   │   ├── README.md
│   │   └── system-architecture.md
│   ├── sprint-artifacts/
│   │   └── Artifacts/
│   ├── pop-up-2026/day-1.md, day-2.md, day-3.md
│   ├── planning/
│   └── roles/ (+ Role Model + Permission Matrix - IAldea.xlsx)
├── examples/fictional-community/community-schema.json
└── config/policy_config.example.yaml, roles.example.yaml
```

---

*Actualizar este archivo al abrir el Día 4.*
