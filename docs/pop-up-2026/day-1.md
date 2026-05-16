# Pop-Up 2026 — Minuta **Día 1** (11 mayo)

**Foco:** visión, límites, ética, borrador SOUL, civic safety, privacidad.

## Asistentes

- (completar)

## Lo que hicimos

- Establecimos la visión del proyecto: *infraestructura abierta para comunidades de menos de 500 habitantes* que les ayude a decidir mejor, entender mejor y recordar mejor, con humanos siempre en el loop.
- Discutimos y acordamos el principio central: **civic safety is the product** — la lista de lo que IAldea *no* hará es más importante que lo que sí hace.
- Bloqueamos los casos prohibidos ("will not do"): sin consejos legales/médicos/emergencia, sin acusaciones, sin votaciones, sin comprometer presupuesto, sin vigilancia.
- Definimos la arquitectura de 4 capas: **Kernel → Graph → Agents → Safety** (Auditor + SOUL.md).
- Arrancamos el borrador del **SOUL.md** de comunidad ejemplo con: identidad, misión, límites, tono, jerarquía de fuentes y escalación.
- Definimos los **3 modos de privacidad** de primera clase: público, confidencial comunitario (k ≥ 3), privado sin memoria.
- Acordamos que el default para nuevas comunidades es `private_no_memory`.
- Establecemos que toda respuesta del agente pasa por el **Auditor** antes de llegar al ciudadano.
- Bloqueamos el stack tecnológico: Node 20+, Python 3.11+, modelos via API key o local, auto-hosteable bajo MIT.
- Decidimos el programa de 4 fases: Pop-Up (11–18 mayo) → Hard-testing (19–28) → Showcase ETH CDM Puebla (29–31) → 3 pilotos comunitarios (junio–julio).

## Decisiones

- **IAldea no es un alcalde digital**: no vota, no decide, no acusa, no reemplaza asamblea.
- **SOUL.md + policy_config.yaml** son las dos fuentes de verdad por comunidad: una humana, otra machine-enforceable.
- **Licencia MIT**: cualquier comunidad, ONG, gobierno o empresa puede forkear y desplegar.
- **Sin stack cerrado**: la plataforma debe funcionar con modelos gratuitos, de pago, locales o remotos.
- **Pilotos ≤ 500 habitantes** con contraparte local de confianza, caso de uso no crítico y consentimiento comunitario documentado y revocable.

## Salidas repo (estado real)

- [x] [`README.md`](../../README.md) — ✅ completo con visión, arquitectura, will-do/will-not-do, privacidad
- [x] [`docs/governance/IaAldea_SOUL.md`](../governance/IaAldea_SOUL.md) — ✅ SOUL operativo del proyecto (identidad y tono; runtime)
- [x] [`docs/governance/SOUL-outline.md`](../governance/SOUL-outline.md) — resumen corto de valores (histórico / didáctico)
- [x] [`docs/foundation/principles.md`](../foundation/principles.md) — ⚠️ placeholder mínimo (civic safety como producto, remite al README)
- [x] [`docs/foundation/civic-safety.md`](../foundation/civic-safety.md) — ⚠️ placeholder mínimo (remite a `policy_config.yaml`)
- [x] [`docs/foundation/privacy.md`](../foundation/privacy.md) — ⚠️ placeholder mínimo (3 modos descritos en README)
- [x] [`docs/foundation/vision.md`](../foundation/vision.md) — ⚠️ placeholder mínimo (remite a README e IaAldea_SOUL)
- [x] [`docs/project/repo-structure.md`](../project/repo-structure.md) — ✅ árbol de archivos permitidos Días 1–2
- [x] [`CONTEXTO-POPUP-VILLAGE.md`](../../CONTEXTO-POPUP-VILLAGE.md) — ✅ contexto completo del sprint

> **Nota:** `foundation/principles.md`, `civic-safety.md`, `privacy.md` y `vision.md` son placeholders que remiten al README y a `governance/IaAldea_SOUL.md`. Pendiente expandirlos con el texto canónico del equipo.

## Pendientes para Día 2

- Validar roles oficiales (7) y etapas del ciclo (8) contra el CSV de colaboradores.
- Acordar **WhatsApp** como canal ciudadano principal (opt-in, política de privacidad).
- Definir niveles L0–L3 y mapeo rol → nivel.
- Definir modos de privacidad por defecto y excepciones.
- Alinear modelo de datos mínimo (`contributor_handle`).
- Dejar matriz de permisos lista para implementación.

## Enlaces

- [`CONTEXTO-POPUP-VILLAGE.md`](../../CONTEXTO-POPUP-VILLAGE.md) §10 Día 1
- [`docs/foundation/principles.md`](../foundation/principles.md), [`docs/foundation/civic-safety.md`](../foundation/civic-safety.md), [`docs/foundation/privacy.md`](../foundation/privacy.md), [`docs/governance/IaAldea_SOUL.md`](../governance/IaAldea_SOUL.md)
