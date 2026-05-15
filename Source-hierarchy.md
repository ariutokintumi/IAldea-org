# source-hierarchy.md
## IAldea — Jerarquía de fuentes
### docs/source-hierarchy.md

> La jerarquía de fuentes es el libro de reglas para decidir qué fuente pesa más
> cuando dos o más fuentes afirman cosas distintas sobre lo mismo.
>
> Pregunta de diseño que guía este documento:
> **¿Qué hace IAldea cuando dos fuentes dicen cosas diferentes?**

**Versión:** 1.0.0
**Fecha:** [2026-05-13]
**Mantenedor:** [nombre + rol]

---

## 1. Definición

La jerarquía de fuentes establece el orden de prioridad que IAldea usa para decidir
qué información es más confiable cuando existe contradicción.

No es un ranking de importancia temática. Es un mecanismo de resolución de conflictos
entre fuentes que sirve al principio central del sistema: mostrar lo que se sabe,
decir cuándo no se sabe, y nunca fingir certeza que no existe.

---

## 2. Orden canónico de confianza

| Trust | Tipo de fuente | Descripción |
|---|---|---|
| 1 | Fuente pública oficial con timestamp verificable | Máxima prioridad. INEGI, gacetas oficiales, portales municipales, DOF, leyes vigentes. |
| 2 | Documento aprobado por la comunidad | Reglamentos, planos, padrones, documentos validados en asamblea o comité. |
| 3 | Acta o minuta de asamblea con quórum válido | Registro formal comunitario con respaldo de quórum. |
| 4 | Feedback ciudadano autorizado | Útil para detectar patrones, no para afirmar hechos definitivos. |
| 5 | Inferencia del modelo de IA | Siempre marcada como [INFERENCIA]. Nunca presentada como hecho confirmado. |

**Regla fundamental:**
Trust 1 tiene máxima prioridad. Trust 5 nunca se presenta como hecho.
Ningún nivel puede usarse como verdad definitiva si está marcado como pendiente,
contradictorio, comprometido u obsoleto.

---

## 3. Cómo maneja el Auditor las contradicciones

El agente Auditor detecta automáticamente contradicciones entre fuentes.
Cuando hay conflicto, el Auditor no elige en silencio. Lo hace visible.

**Reglas de resolución:**

La fuente de mayor trust tiene prioridad, pero la contradicción siempre se muestra
cuando es relevante para la consulta. IAldea no oculta que existen versiones distintas.

Cuando dos fuentes del mismo trust se contradicen, IAldea no elige ninguna.
Presenta ambas con atribución y escala a revisión por Validadoría o gobernanza.

Cuando una fuente más reciente de menor trust contradice una fuente más antigua
de mayor trust, la fuente de mayor trust prevalece por defecto.
La fuente reciente de menor trust se muestra como posible señal de cambio,
pero no reemplaza automáticamente sin evidencia verificable de actualización oficial.

Cuando la contradicción afecta una decisión sensible (presupuesto, seguridad, salud,
emergencia), IAldea no da conclusión. Escala siempre a revisión humana.

---

## 4. Empates entre fuentes del mismo nivel

Cuando dos o más fuentes con el mismo trust level se contradicen:

1. IAldea presenta ambas fuentes con atribución completa: institución, fecha, trust, estado.
2. Muestra una alerta visible de "fuentes contradictorias".
3. No emite conclusión sin revisión humana.
4. El caso se envía a Validadoría o al proceso de gobernanza definido.

**Mensaje canónico para empate:**
"Las fuentes disponibles sobre este punto no coinciden. No puedo presentar
una conclusión. Esto requiere revisión antes de tomar una decisión."

---

## 5. Obsolescencia: cuándo una fuente pierde vigencia

Una fuente se marca como obsoleta cuando:

- Existe una versión más reciente del mismo documento o dato.
- La institución emisora dejó de mantenerla o la reemplazó oficialmente.
- Su contenido ya no representa el estado actual de una situación.
- Validadoría o Secretaría determina que perdió vigencia.

**Cómo se trata una fuente obsoleta:**

No se usa como base factual para respuestas actuales.
Puede mostrarse como antecedente histórico con advertencia visible.
Si existe versión vigente, se prioriza la versión nueva.

**Mensaje canónico para fuente obsoleta:**
"Esta fuente puede estar desactualizada. La muestro solo como antecedente.
Para tomar decisiones, verifica si existe una versión más reciente."

---

## 6. Fuente comprometida: pérdida de integridad

Una fuente se marca como comprometida cuando hay señales verificadas de:

- Alteración o manipulación del contenido.
- Pérdida de integridad verificable.
- Origen dudoso o no confirmado.
- Contradicciones críticas no resueltas que sugieren manipulación.
- Falla de autenticidad detectada por Validadoría o Admin técnico.

**Cómo se trata una fuente comprometida:**

No se usa bajo ninguna circunstancia como base factual.
Si el rol tiene permiso para ver su estado, puede mostrarse el estado sin revelar detalles sensibles.
El caso se escala a Validadoría y, si hay riesgo técnico, a Admin técnico.

**Mensaje canónico para fuente comprometida:**
"Esta fuente fue marcada como comprometida y no puede usarse como base de respuesta.
Puedo buscar otra fuente activa o dejar el tema como pendiente de validación."

---

## 7. Cuándo una fuente de menor trust puede superar a una de mayor trust

La recencia por sí sola no basta para superar una fuente de mayor confianza.

Una fuente más reciente de menor trust puede superar a una más antigua de mayor trust
únicamente cuando se cumple alguna de estas condiciones:

- Existe evidencia verificable de que la fuente más reciente es una actualización
  oficial de la fuente anterior (por ejemplo, una nueva gaceta que reemplaza
  explícitamente a la anterior).
- La fuente más reciente fue validada por Validadoría o por el proceso de gobernanza
  y su estado fue actualizado a active.
- La institución emisora de la fuente original confirma que la nueva fuente es su versión vigente.

Si ninguna de estas condiciones se cumple, prevalece la fuente de mayor trust.

**Mensaje canónico para reemplazo verificado:**
"Hay una versión más reciente que reemplaza a la anterior.
Uso la actualizada. Conservo la versión anterior como antecedente histórico."

---

## 8. Matriz de comportamiento por caso de contradicción

| Caso | Comportamiento de IAldea | Qué muestra | Quién revisa | Mensaje canónico |
|---|---|---|---|---|
| Trust 1 contradice Trust 3 | Prioriza Trust 1, muestra contradicción si es relevante. | Ambas fuentes, fechas, trust, diferencia. | Validadoría o Coordinación si afecta proceso. | "La fuente oficial y el acta comunitaria no dicen lo mismo. Uso la fuente oficial como referencia. Si esto afecta una decisión, se requiere revisión." |
| Trust 2 contradice Trust 3 | Prioriza documento aprobado salvo que acta sea más reciente y documente actualización válida. | Documento aprobado, acta, fechas, vigencia. | Validadoría o Comité. | "Hay una diferencia entre un documento aprobado y un acta. No puedo confirmar cuál aplica. Esto requiere revisión." |
| Dos fuentes del mismo trust contradicen | No elige. Presenta ambas y escala. | Alerta, ambas fuentes, motivo del conflicto. | Validadoría y proceso de gobernanza. | "Las fuentes disponibles sobre este punto no coinciden. No puedo presentar una conclusión. Esto requiere revisión." |
| Fuente más reciente de menor trust vs fuente antigua de mayor trust | No reemplaza automáticamente. Muestra como posible señal. | Fuente mayor trust, fuente reciente, nota de recencia. | Comité, Coordinación o Validadoría. | "Encontré información más reciente, pero su fuente tiene menor certeza. Puede reflejar un cambio que aún no fue validado." |
| Fuente más reciente supera fuente anterior | Acepta la nueva si hay evidencia verificable de reemplazo oficial. | Fuente anterior, fuente nueva, fecha de reemplazo. | Validadoría confirma si aplica. | "Hay una versión más reciente que reemplaza a la anterior. Uso la actualizada. Conservo la versión anterior como antecedente." |
| Solo existe feedback ciudadano | No lo presenta como hecho oficial. Muestra como patrón si cumple mínimo. | Patrón agregado, rango de reportes, zona general, sin identidades. | Comité o Coordinación si se convierte en propuesta. | "Hay reportes de la comunidad sobre este tema, pero no encontré una fuente oficial que los respalde. Los muestro como señal, no como hecho confirmado." |
| Solo existe inferencia de IA | No responde como hecho. Etiqueta como inferencia o se niega si el tema es sensible. | Etiqueta [INFERENCIA], falta de fuente, sugerencia de verificación. | No aplica, salvo que se solicite revisión. | "La información disponible no me permite confirmar esto. Lo que sigue es una inferencia, no un hecho documentado. [INFERENCIA]" |
| Fuente pendiente de validación | Solo como contexto con advertencia, no como base factual. | Estado "pendiente", quién la subió, fecha, advertencia. | Validadoría. | "Esta fuente está pendiente de validación. Puede servir como contexto, pero no como dato confirmado. [REQUIERE REVISION HUMANA]" |
| Fuente comprometida | No la usa. Puede mencionar su estado si el rol tiene permiso. | Estado "comprometida", sin detalles sensibles. | Validadoría y Admin técnico. | "Esta fuente fue marcada como comprometida y no puede usarse como base de respuesta." |
| Fuente obsoleta | Solo como antecedente histórico. | Estado "obsoleta", versión vigente si existe, fecha de reemplazo. | Validadoría o Secretaría. | "Esta fuente puede estar desactualizada. La muestro solo como antecedente." |
| Fuente confidencial para rol no autorizado | No la usa ni confirma su existencia. Ofrece buscar información pública. | Solo información pública relacionada. | No aplica. | "Esa información no está disponible para tu rol. Puedo ayudarte a consultar lo que sí es público sobre este tema." |
| Fuente legal o judicial | Cita como fuente pública, no interpreta ni da consejo legal. | Fuente, fecha, cita, aviso de límite legal. | Experto legal si se requiere interpretación. | "Puedo mostrarte la fuente pública relacionada. No puedo interpretarla como asesoría legal ni definir responsabilidades." |
| Contradicción afecta decisión sensible | No da conclusión. Escala a revisión humana siempre. | Contradicción, fuentes, riesgo, recomendación. | Validadoría, Comité, Tesorería o experto según el caso. | "Las fuentes sobre este tema no coinciden y el asunto es sensible. No puedo presentar una conclusión. Esto requiere revisión." |
| No hay fuentes suficientes | No inventa. Dice que no hay información y sugiere vía alternativa. | Estado "sin fuente suficiente", posible ruta alternativa. | Secretaría o Coordinación si falta cargar documentos. | "La información disponible no me permite confirmar esto. Puedes verificar con la instancia comunitaria responsable o pedir que se cargue el documento correspondiente." |
| Fuentes con diferentes niveles de acceso | Genera respuestas distintas según rol. | Rol autorizado ve ambas fuentes. Rol no autorizado solo ve fuente pública. | Reglas automáticas del Auditor. | "Esta es la información que puedo compartirte." |

---

## 9. Reglas transversales del Auditor sobre fuentes

| Regla | Comportamiento |
|---|---|
| Sin fuente suficiente | No responder como hecho. Ofrecer contexto o ruta alternativa. |
| Fuente contradictoria | Mostrar contradicción o pedir revisión humana. |
| Fuente fuera del permiso del rol | No usarla en respuesta visible ni confirmar su existencia. |
| Fuente confidencial | Solo usar si el rol tiene acceso verificado. |
| Inferencia IA | Siempre etiquetar como [INFERENCIA]. |
| Fuente comprometida | Bloquear uso. No usar como base factual. |
| Fuente obsoleta | Mostrar como histórica, no como vigente. |
| Fuente pendiente | Solo como contexto con advertencia visible. |

---

## 10. UX requerida

**Aviso de contradicción:**
Alerta visible con etiqueta "Fuentes contradictorias", ambas fuentes,
trust level de cada una, fecha y motivo por el que no hay conclusión automática.

**Comparador de fuentes:**
Vista lado a lado con: fuente, afirmación, fecha, trust, estado, quién validó, diferencia clave.
Estados: sin resolver, enviada a revisión, resuelta, archivada.

**Etiqueta de inferencia:**
Badge visible [INFERENCIA] en cualquier respuesta que use Trust 5.
Incluye explicación breve y recomendación de verificación.

**Nivel de certeza:**
Visible en respuestas: alto (fuente activa Trust 1-2), medio (fuentes mixtas),
bajo (fuentes débiles), no verificable (solo inferencia o sin fuentes).

**Aviso de información insuficiente:**
Mensaje claro cuando no hay fuente suficiente, con qué faltaría y posible vía de verificación.

---

## Mensajes canónicos — referencia rápida para MVP

| Caso | Mensaje canónico |
|---|---|
| Fuentes contradictorias | "Encontré fuentes verificables que se contradicen sobre este tema. Puedo mostrar ambas con su origen, fecha y nivel de confianza, pero se requiere revisión humana para confirmar." |
| Solo fuente débil | "No encontré una fuente suficientemente confiable para responder esto como hecho. Puedo mostrar el contexto disponible y marcarlo como información no confirmada." |
| Fuente más reciente de menor confianza | "Hay información más reciente, pero proviene de una fuente con menor nivel de confianza. No debe reemplazar automáticamente a la fuente principal sin revisión humana." |
| Fuente fuera del rol | "No puedo usar esa fuente en esta respuesta porque tu rol no tiene acceso a ese nivel de información." |
| Contradicción sin resolución posible | "Encontré fuentes verificables que se contradicen. No puedo presentar una conclusión confirmada sin revisión humana. Puedo mostrar ambas fuentes con su origen, fecha y nivel de confianza." |

---

*source-hierarchy.md versión 1.0.0 — docs/source-hierarchy.md*
*IAldea — ETH Cinco de Mayo, 2026*
