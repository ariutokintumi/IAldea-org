# Pop-Up 2026 — Minuta **Día 2** (12 mayo) — cierre

**Foco:** estructura de comunidad, roles, permisos, niveles de acceso, separación autoridad/ciudadanía, modos público/confidencial/privado.

## Asistentes

- (completar)

## Lo que hicimos

- Definimos 7 roles oficiales con slugs para código y YAML (`secretaria`, `coordinacion`, `comite_miembro`, `tesoreria`, `validador`, `ciudadano`, `financiador`).
- Establecimos 8 etapas del ciclo de coordinación y su relación con la IA.
- Acordamos los niveles de acceso L0–L3 y su mapeo por rol.
- Definimos 3 modos de privacidad (público, confidencial comunitario, privado ciudadano) con k-anonimato ≥ 3.
- Especificamos el modelo de datos mínimo con `contributor_handle` pseudónimo.
- Acordamos la arquitectura de WhatsApp como canal principal (opt-in, hash de teléfono).
- Generamos `policy_config.example.yaml` y `roles.example.yaml` en `config/`.
- Llenamos `examples/fictional-community/community-schema.json`.

## Decisiones

- Canal ciudadano acordado: **WhatsApp** (opt-in, política de privacidad).
- Teléfono nunca en claro: se usa `channel_ref_hash` en tablas de analítica.
- Ninguna liberación de fondos solo por IA — Tesorería requiere acto humano.
- Los niveles L0–L3 se resuelven en Node.js, nunca por el LLM.

## Salidas repo (estado real al cierre)

- [x] [`docs/roles/role-model.md`](../roles/role-model.md) — ✅ presente
- [x] [`docs/roles/permission-matrix.csv`](../roles/permission-matrix.csv) — ⚠️ **eliminado** (contenido consolidado en `.md`; los CSV de roles fueron limpiados del repo; solo quedan `.md`)
- [x] [`config/roles.example.yaml`](../../config/roles.example.yaml) — ✅ presente
- [x] [`config/policy_config.example.yaml`](../../config/policy_config.example.yaml) — ✅ presente (no estaba en checklist original pero es entregable clave)
- [x] [`examples/fictional-community/community-schema.json`](../../examples/fictional-community/community-schema.json) — ✅ presente
- [x] [`docs/roles/user-stories.md`](../roles/user-stories.md) — ✅ presente

> **Nota:** los archivos `.csv` de `docs/roles/` fueron eliminados del repo (limpieza de archivos redundantes). La información canónica vive en los `.md` correspondientes.

## Pendientes para Día 3

- Arquitectura de subagentes WhatsApp → en `docs/planning/dia_03_whatsapp_subagentes_orquestacion.md`.
- `docs/architecture/system-architecture.md` (modelo Kernel, pipeline de ingestión) → mantener alineado al código.
- Implementación del Conmutador y orquestadores → **pendiente (Día 4+)**.

## Enlaces

- [`CONTEXTO-POPUP-VILLAGE.md`](../../CONTEXTO-POPUP-VILLAGE.md) §10 Día 2
- [`docs/planning/dia_02_gobernanza_roles_y_accesos.md`](../planning/dia_02_gobernanza_roles_y_accesos.md)
