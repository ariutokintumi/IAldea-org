# Alcance del repo — Días 1 y 2 (Pop-Up)

Este archivo delimita **qué debe vivir en el repositorio** mientras el sprint cubre solo **Día 1 y Día 2**. El resto de días (3–8) se documenta en [`CONTEXTO-POPUP-VILLAGE.md`](CONTEXTO-POPUP-VILLAGE.md) §10; **no** se mezclan aquí entregables futuros (ingesta pesada, GIS, PDFs de anuarios, latitudes, capas raster, etc.) para no ensuciar el árbol ni confundir a quien clone el proyecto.

---

## Día 1 — Visión, límites y ética

**Foco:** qué es y qué no es IAldea; primer `SOUL`; principios y seguridad cívica.

**Outputs esperados (paths típicos):**

- `docs/principles.md`
- `docs/civic-safety.md`
- `docs/positioning-v1.md`
- `soul/SOUL.example.md` (y plantilla `soul/SOUL.community-template.md`)
- `docs/pop-up-2026/day-1.md` (minuta)

---

## Día 2 — Modelo de comunidad, roles y permisos

**Foco:** roles, permisos, niveles de acceso, modos de privacidad, canal ciudadano (**WhatsApp**), matriz legible y YAML de ejemplo.

**Outputs esperados:**

- `docs/roles/role-model.md`
- `docs/roles/permission-matrix.csv`
- `docs/roles/user-stories.md`
- `docs/planning/dia_02_gobernanza_roles_y_accesos.md`
- `config/policy_config.example.yaml`, `config/roles.example.yaml`
- `apps/web/configurator/` (MVP asistente de configuración)
- `docs/pop-up-2026/day-2.md` (minuta)

---

## Qué **no** va en esta fase del repo

- Raster MDT, metadatos INEGI masivos, `derivados/*.tif`, PDFs de anuario ni scripts de procesamiento geoespacial (eso era experimentación paralela; si se retoma, será **Día 3+** con carpeta y PR dedicados).
- Código de `apps/api` completo, motor de grafo productivo, red-team: **días posteriores** según CONTEXTO.

---

*Referencia canónica del calendario: CONTEXTO-POPUP-VILLAGE.md §10.*
