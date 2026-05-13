# `packages/agents` — orquestación por rol

Los **siete roles** del modelo (`docs/roles/role-model.md`) no obligan a siete modelos de lenguaje distintos. Lo habitual es:

1. **Una tubería fija** (misma para todos los usuarios).
2. **Varios perfiles de sistema** (instrucciones + herramientas permitidas) elegidos según `role_slug` y nivel L0–L3.
3. **Un solo filtro final** de seguridad (Capa 04) que no depende del “agente bonito” del usuario.

---

## Tubería (qué recibe qué, y quién filtra)

Orden recomendado en runtime:

| Paso | Componente | Entrada | Salida | Notas |
|------|------------|---------|--------|--------|
| 1 | **Ensamblador de contexto** | Mensaje canal (p. ej. WhatsApp), `community_id`, `contributor_handle`, `role_slug`, `policy_config`, fragmentos RAG, historial permitido por modo de privacidad. | `ContextPack` (JSON interno): hechos recuperados, citas, límites, rol. | No llama al LLM. Solo lectura Kernel/retrieval + metadatos sesión. |
| 2 | **Puerta previa (opcional)** | Texto del usuario + `ContextPack`. | `allow` / `block` / `escalate_human` + motivo corto. | Clasificador barato (regex/heurística o modelo pequeño). Corta **antes** del LLM temas prohibidos (`policy` + `_protected_rules`). Vive cerca de `packages/civic-safety` o lo importa. |
| 3 | **Generador por rol** | `ContextPack` + decisión de la puerta previa. | Borrador de respuesta en lenguaje natural. | Aquí cambia el **system prompt** y las **tools** según rol (ver tabla abajo). Implementación: un solo módulo con `dispatch(role_slug)`. |
| 4 | **Auditor final (obligatorio)** | Borrador + `ContextPack` + `SOUL`. | Respuesta al usuario o rechazo educativo. | **Siempre** después del LLM: citas, fugas, legal/médico/electoral, acusaciones, identificación indebida. |

**Quién “filtra”:** la **puerta previa** (rápida, ahorra tokens) y el **auditor** (garantía). El generador por rol **no** debe considerarse filtro de seguridad.

---

## Roles → perfiles de agente (MVP razonable)

| `role_slug` | Perfil de generador | Contrato de alto nivel |
|-------------|---------------------|-------------------------|
| `ciudadano` | **Ciudadano** | Citas, trámites/acuerdos públicos, feedback según modo de privacidad; sin agregados identificables de terceros. Ver [citizen.md](citizen.md). |
| `financiador` | **Ciudadano restringido** | Mismo tubería que ciudadano + instrucciones extra: solo métricas **agregadas**, sin presionar decisiones ni acceso operativo a comités. |
| `secretaria`, `coordinacion`, `comite_miembro`, `tesoreria`, `validador` | **Gobernanza** (un solo motor con variantes) | Documentos internos, preparación de asamblea, escenarios no críticos, evidencia; **tesorería**: nunca “liberar fondos” por IA; **validador**: énfasis en checklists y trazabilidad. Ver [authority.md](authority.md). |
| `admin_plataforma` (L3) | **Operador** | Mensajes orientados a ingesta, configuración y auditoría técnica; no es “voz política” hacia ciudadanía. |

Si más adelante el producto lo exige, se puede **partir** “Gobernanza” en dos binarios LLM (`secretaria` vs `resto`) sin cambiar la tubería: solo otro `system` y otra lista de tools.

---

## Qué recibe cada tipo de usuario (resumen)

- **Ciudadano / financiador:** respuestas del perfil Ciudadano (financiador con recortes). El contexto RAG está acotado a documentos **permitidos para L1** y al modo de privacidad.
- **Roles L2:** el ensamblador puede incluir minutas, borradores y agregados internos que **no** ve el ciudadano; el auditor sigue evitando fugas si el canal es el mismo (p. ej. WhatsApp mal configurado).
- **L3:** interacciones de sistema; idealmente **canal distinto** (consola / web admin), no el mismo número ciudadano.

---

## Archivos en esta carpeta

| Archivo | Propósito |
|---------|-----------|
| [citizen.md](citizen.md) | Contrato de comportamiento del perfil ciudadano. |
| [authority.md](authority.md) | Contrato del perfil gobernanza + notas por `tesoreria` / `validador`. |

Implementación futura (**Día 3+**, según CONTEXTO): un paquete que importe `packages/civic-safety`, `packages/retrieval`, `packages/memory-kernel` (cuando existan en el repo) y exponga p. ej. `run_turn(context_pack) -> audited_reply`.

---

## Referencias

- Roles y etapas: [`docs/roles/permission-matrix.csv`](../../docs/roles/permission-matrix.csv), [Día 2 §4–§9](../../docs/planning/dia_02_gobernanza_roles_y_accesos.md).
- Capas globales: [`CONTEXTO-POPUP-VILLAGE.md`](../../CONTEXTO-POPUP-VILLAGE.md) §11 y stub [`docs/architecture.md`](../../docs/architecture.md) (diagramas largos: Día 3+).
