# Role model IAldea (resumen)

Este archivo resume el modelo acordado con colaboradores. El detalle operativo (WhatsApp, `contributor_handle`, L0–L3, YAML) está en [dia_02_gobernanza_roles_y_accesos.md](../planning/dia_02_gobernanza_roles_y_accesos.md).

## Roles canónicos (slugs)

| Rol en UI | `slug` | Notas |
|-----------|--------|--------|
| Secretaría | `secretaria` | Memoria, actas, registro de etapas. |
| Coordinación | `coordinacion` | Orquesta procesos entre actores. |
| Miembro de Comité | `comite_miembro` | Propone, ejecuta, evidencia. |
| Tesorería | `tesoreria` | Viabilidad y registro de recursos; **no** libera fondos sin humano. |
| Validador | `validador` | Cumplimiento y exactitud en etapas de verificación / informe. |
| Ciudadano | `ciudadano` | Input, consulta, memoria según modo de privacidad. |
| Financiador | `financiador` | Visión agregada y comentarios de financiamiento **sin** condicionar decisiones. |

## Ciclo por etapas

Ver columnas **Etapa** y roles en [permission-matrix.csv](permission-matrix.csv).

## Medio de consulta ciudadana

**WhatsApp** como canal principal para consultas ciudadanas (ver plan Día 2 §2).

## Agentes por rol (runtime)

Misma tubería de seguridad; cambian instrucciones y herramientas según `role_slug`: [`packages/agents/README.md`](../../packages/agents/README.md).
