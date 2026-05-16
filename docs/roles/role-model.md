# Role model IAldea (resumen)

Este archivo resume el modelo acordado con colaboradores. El detalle operativo (WhatsApp, `contributor_handle`, L0–L3, YAML) está en [dia_02_gobernanza_roles_y_accesos.md](../planning/dia_02_gobernanza_roles_y_accesos.md).

Para la narrativa **por etapa del ciclo** (Entender → Aprender) y el glosario de columnas del export, ver [roles-por-etapa.md](roles-por-etapa.md) y el CSV [role-model-permission-matrix-full.csv](role-model-permission-matrix-full.csv).

Para **experiencia por rol**, **comportamiento / firewall** y **decisiones de producto** por etapa, ver [role-experience-matrix.md](role-experience-matrix.md), [matriz-comportamiento-por-rol.md](matriz-comportamiento-por-rol.md) y [decisiones-de-producto.md](decisiones-de-producto.md); flujos resumidos en [flujos-por-etapa.md](flujos-por-etapa.md). Índice de todas las pestañas: [excel-sheets.md](excel-sheets.md).

## Roles canónicos (slugs)


| Rol en UI         | `slug`           | Notas                                                                           |
| ----------------- | ---------------- | ------------------------------------------------------------------------------- |
| Secretaría        | `secretaria`     | Memoria, actas, registro de etapas.                                             |
| Coordinación      | `coordinacion`   | Orquesta procesos entre actores.                                                |
| Miembro de Comité | `comite_miembro` | Propone, ejecuta, evidencia.                                                    |
| Tesorería         | `tesoreria`      | Viabilidad y registro de recursos; **no** libera fondos sin humano.             |
| Validador         | `validador`      | Cumplimiento y exactitud en etapas de verificación / informe.                   |
| Ciudadano         | `ciudadano`      | Input, consulta, memoria según modo de privacidad.                              |
| Financiador       | `financiador`    | Visión agregada y comentarios de financiamiento **sin** condicionar decisiones. |
| Admin técnico     | *(operación)*   | Configuración técnica, logs y fuentes; historias en [user-stories-por-rol.md](user-stories-por-rol.md). |
| Operador de Piloto | *(operación)* | Despliegue y adopción del piloto; mismas historias. |

Los slugs `admin_tecnico` y `operador_piloto` pueden añadirse en `roles.example.yaml` cuando el comité los formalice.

## Ciclo por etapas

Ver columnas **Etapa** y roles en [permission-matrix.csv](permission-matrix.csv). La versión ampliada del export (mismas filas de etapa, columnas UX y plantilla) está en [role-model-permission-matrix-full.csv](role-model-permission-matrix-full.csv); lectura tabular en [roles-por-etapa.md](roles-por-etapa.md).

## Medio de consulta ciudadana

**WhatsApp** como canal principal para consultas ciudadanas (ver plan Día 2 §2).

## Runtime (Día 4+)

Comportamiento conversacional por rol y capas Kernel/Graph/Safety: [`CONTEXTO-POPUP-VILLAGE.md`](../../CONTEXTO-POPUP-VILLAGE.md) §11 y entregables del **Día 4** (agente ciudadano / comité, auditor).