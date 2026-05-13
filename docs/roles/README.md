# `docs/roles/`

Índice de pestañas del Excel ↔ CSV: **[excel-sheets.md](excel-sheets.md)**.

## Libro fuente (todas las hojas)

- **[Role Model + Permission Matrix - IAldea.xlsx](../Role%20Model%20+%20Permission%20Matrix%20-%20IAldea.xlsx)** — Excel con todas las pestañas.
- **Regenerar CSV y Markdown desde el Excel:** en la raíz del repo, con `openpyxl` instalado (`python3 -m venv .venv && .venv/bin/pip install openpyxl`), ejecutar `python3 scripts/export_role_model_excel.py`.

## Resumen y modelo

- **[role-model.md](role-model.md)** — roles, slugs y enlaces.
- **[roles-por-etapa.md](roles-por-etapa.md)** — ciclo **Entender → Aprender** (derivado de la matriz completa).

## Matrices (CSV + MD)

| CSV | Markdown |
|-----|----------|
| [permission-matrix.csv](permission-matrix.csv) | (tablas en roles-por-etapa) |
| [v1-role-model-permission-matrix.csv](v1-role-model-permission-matrix.csv) | Igual que `permission-matrix` (pestaña V1 del Excel). |
| [role-model-permission-matrix-full.csv](role-model-permission-matrix-full.csv) | [roles-por-etapa.md](roles-por-etapa.md), [user-stories-matriz.md](user-stories-matriz.md) |
| [role-experience-matrix.csv](role-experience-matrix.csv) | [role-experience-matrix.md](role-experience-matrix.md) |
| [matriz-comportamiento-por-rol.csv](matriz-comportamiento-por-rol.csv) | [matriz-comportamiento-por-rol.md](matriz-comportamiento-por-rol.md) |
| [decisiones-de-producto.csv](decisiones-de-producto.csv) | [decisiones-de-producto.md](decisiones-de-producto.md) |
| [flujos-por-etapa.csv](flujos-por-etapa.csv) | [flujos-por-etapa.md](flujos-por-etapa.md) |

## User stories

- **[user-stories.md](user-stories.md)** — historias cortas del taller Día 2.
- **[user-stories-por-rol.csv](user-stories-por-rol.csv)** · **[user-stories-por-rol.md](user-stories-por-rol.md)** — por rol (C-01… OP-05).
- **[user-stories-transversales.csv](user-stories-transversales.csv)** · **[user-stories-transversales.md](user-stories-transversales.md)** — X-01… (todos los roles).
- **[us-prioritarias-mvp.csv](us-prioritarias-mvp.csv)** · **[us-prioritarias-mvp.md](us-prioritarias-mvp.md)** — priorización MVP.
- **[user-stories-matriz.md](user-stories-matriz.md)** — preguntas UX por etapa del ciclo.

El plan detallado del Día 2 (WhatsApp, L0–L3, YAML) está en [planning/dia_02_gobernanza_roles_y_accesos.md](../planning/dia_02_gobernanza_roles_y_accesos.md).
