# Guía definitiva del repo — **Solo Día 1 y Día 2** (CONTEXTO §10)

Calendario completo del Pop-Up: `[CONTEXTO-POPUP-VILLAGE.md](CONTEXTO-POPUP-VILLAGE.md)` §10. Recordatorio diario del equipo: `[guia-diaria.md](guia-diaria.md)`.

Este archivo lista **únicamente** lo que debe estar versionado al **cierre del Día 2**. Cualquier otro archivo o carpeta (arquitectura detallada, agentes, `apps/web`, ingesta, GIS, PDF, etc.) **no** entra hasta su día en el CONTEXTO.

---

## Día 1 — Visión, límites y ética


| Ruta obligatoria (CONTEXTO)                              | Estado                             |
| -------------------------------------------------------- | ---------------------------------- |
| `[docs/principles.md](docs/principles.md)`               | ✓                                  |
| `[soul/SOUL.example.md](soul/SOUL.example.md)`           | ✓                                  |
| `[docs/civic-safety.md](docs/civic-safety.md)`           | ✓                                  |
| `[docs/positioning-v1.md](docs/positioning-v1.md)`       | Posicionamiento público (borrador) |
| `[docs/pop-up-2026/day-1.md](docs/pop-up-2026/day-1.md)` | Minuta Día 1                       |
| `[docs/privacy.md](docs/privacy.md)`                     | Modos de privacidad                |
| `[docs/vision.md](docs/vision.md)`                       | Visión                             |


Raíz: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `README.md`, `LICENSE`, `CONTEXTO-POPUP-VILLAGE.md`.

---

## Día 2 — Modelo de comunidad y roles


| Ruta obligatoria (CONTEXTO)                                                                                | Estado                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[docs/roles/role-model.md](docs/roles/role-model.md)`                                                     | ✓                                                                                                                                                                                        |
| `[config/roles.example.yaml](config/roles.example.yaml)`                                                   | ✓                                                                                                                                                                                        |
| `[docs/roles/permission-matrix.csv](docs/roles/permission-matrix.csv)`                                     | ✓                                                                                                                                                                                        |
| `[docs/roles/role-model-permission-matrix-full.csv](docs/roles/role-model-permission-matrix-full.csv)`     | Export hoja *Role Model + Permission Matrix* (columnas UX; lectura en [roles-por-etapa.md](docs/roles/roles-por-etapa.md) / [user-stories-matriz.md](docs/roles/user-stories-matriz.md)) |
| `[docs/Role Model + Permission Matrix - IAldea.xlsx](docs/Role%20Model%20+%20Permission%20Matrix%20-%20IAldea.xlsx)` | Libro Excel (todas las pestañas); alinear CSV del repo al volver a exportar desde Sheets |
| `[examples/fictional-community/community-schema.json](examples/fictional-community/community-schema.json)` | Esquema ~300 hab. ficticio                                                                                                                                                               |
| `[docs/roles/user-stories.md](docs/roles/user-stories.md)`                                                 | ✓                                                                                                                                                                                        |
| `[docs/roles/user-stories-por-rol.csv](docs/roles/user-stories-por-rol.csv)`                               | Pestaña *UserStories por rol* (export; lectura [user-stories-por-rol.md](docs/roles/user-stories-por-rol.md))                                                                            |
| `[docs/pop-up-2026/day-2.md](docs/pop-up-2026/day-2.md)`                                                   | Minuta Día 2                                                                                                                                                                             |
| `[config/policy_config.example.yaml](config/policy_config.example.yaml)`                                   | Política machine-enforceable                                                                                                                                                             |
| `[docs/planning/dia_02_gobernanza_roles_y_accesos.md](docs/planning/dia_02_gobernanza_roles_y_accesos.md)` | Taller Día 2 (detalle; no sustituye CSV/YAML)                                                                                                                                            |
| `[docs/planning/README.md](docs/planning/README.md)`                                                       | Índice planning                                                                                                                                                                          |


---

## Explícitamente **fuera** del repo en D1–D2

- `docs/architecture.md` diagrama completo → **Día 3**
- `packages/agents/`*, `apps/web/*`, prototipo chat → **Día 4**
- Scripts de ingesta, Kernel, grafo, vectores → **Día 3+**
- Red-team, tests de seguridad → **Día 6**
- Datos pesados: PDF anuarios, GeoTIFF, `metadatos/`, `derivados/` → `.gitignore`

---

## Árbol esperado al cierre del Día 2

```
/
├── CONTEXTO-POPUP-VILLAGE.md
├── guia-diaria.md
├── reestructura.md
├── README.md, LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md
├── docs/
│   ├── vision.md, principles.md, civic-safety.md, privacy.md, positioning-v1.md
│   ├── Role Model + Permission Matrix - IAldea.xlsx
│   ├── README.md
│   ├── pop-up-2026/day-1.md, day-2.md
│   ├── planning/README.md, dia_02_gobernanza_roles_y_accesos.md
│   └── roles/README.md, permission-matrix.csv, role-model-permission-matrix-full.csv, role-model.md, roles-por-etapa.md, user-stories.md, user-stories-por-rol.csv, user-stories-por-rol.md, user-stories-matriz.md
├── examples/fictional-community/community-schema.json
├── soul/SOUL.example.md, SOUL.community-template.md
└── config/policy_config.example.yaml, roles.example.yaml
```

---

*Actualizar este archivo al abrir el Día 3.*