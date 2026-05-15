# episodic.md
## IAldea — Especificación de memoria episódica
### packages/memory-kernel/episodic.md

> La memoria episódica es el registro de interacciones pasadas: preguntas, respuestas,
> fuentes, rol, idioma, modo de privacidad y contexto mínimo necesario para que IAldea
> pueda recordar sin convertirse en vigilancia.
>
> Pregunta de diseño que guía este documento:
> **¿Qué puede recordar IAldea sin convertirse en vigilancia?**

**Versión:** 1.0.0
**Fecha:** [2026-05-13]
**Mantenedor:** [nombre + rol]

---

## 1. Definición

Un episodio es el registro mínimo de una interacción entre un usuario y IAldea.
No es una conversación completa ni un historial de comportamiento.
Es la unidad mínima de memoria que permite que el sistema sirva mejor a la comunidad
sin construir perfiles individuales ni exponer lo que las personas dijeron en privado.

La memoria episódica existe para servir a la comunidad, no para vigilar a las personas.
Cada episodio guardado debe poder justificarse con una necesidad cívica concreta.

---

## 2. Qué se guarda por turno

Cada episodio guarda exactamente estos campos y ninguno más:

```yaml
episode_id:           # identificador único del episodio
community_id:         # comunidad donde ocurrió la interacción
user_pseudonymous_id: # identificador pseudónimo, nunca nombre real
user_role:            # rol activo al momento de la interacción
timestamp:            # fecha y hora exacta (UTC)
language:             # idioma de la interacción
privacy_mode:         # público | confidencial_comunitario | privado_sin_memoria | privado_operativo
question:             # pregunta o consulta del usuario (si el modo lo permite)
answer:               # respuesta entregada por IAldea (si el modo lo permite)
source_ids:           # lista de IDs de fuentes usadas
source_citations:     # citas formateadas de las fuentes usadas
retention_until:      # fecha de expiración según privacy_mode
audit_flags:          # flags de seguridad si aplica (sin contenido sensible)
```

No se guarda nada fuera de estos campos.
Si un campo no aplica para el privacy_mode activo, queda vacío o nulo, no ausente.

---

## 3. Qué no se guarda nunca

Estos datos no se guardan bajo ningún privacy_mode ni bajo ninguna instrucción
de cualquier rol, incluyendo admin técnico y operador de piloto:

- IPs crudas o identificadores de red.
- Contraseñas, claves privadas, tokens de autenticación.
- Datos bancarios o financieros personales.
- Nombres completos asociados a quejas, conflictos o necesidades.
- Correos, teléfonos u otros datos de contacto personal.
- Ubicaciones exactas de personas.
- Datos biométricos de cualquier tipo.
- Credenciales de cualquier tipo.
- Contenido de sesiones en modo privado sin memoria.
- Cualquier dato que permita reidentificar a una persona en un output agregado.

---

## 4. Reglas de retención por privacy_mode

| Privacy mode | Qué se guarda | Retención | Quién puede recuperar |
|---|---|---|---|
| Público | Todos los campos del episodio | Indefinida (salvo política distinta de la comunidad) | Roles autorizados según permisos |
| Confidencial comunitario | Todos los campos del episodio | 365 días por defecto | Usuario originador y roles explícitamente autorizados |
| Privado sin memoria | Solo: episode_id, community_id, user_role, timestamp, privacy_mode | Cero retención de contenido | Nadie. No existe episodio recuperable |
| Privado operativo | Todos los campos excepto emociones personales e inferencias sensibles | Indefinida (salvo política distinta) | Solo roles explícitamente autorizados (Coordinación, Secretaría) |

**Regla dura sobre modo privado sin memoria:**
En este modo no se guarda pregunta, respuesta, resumen, embeddings, fuentes personales
ni ningún contenido recuperable después de cerrar la sesión.
Solo queda un evento mínimo de auditoría sin contenido:
sesión privada activada, timestamp, community_id y user_role pseudónimo.

---

## 5. Recall: cómo se recupera la memoria

El recall es el proceso por el que un episodio guardado puede aparecer en una respuesta.
No es automático. El agente Auditor verifica cada condición antes de permitirlo.

**Condiciones que deben cumplirse todas para que un episodio se recupere:**

1. El episodio pertenece a la misma comunidad (community_id coincide).
2. El rol del usuario actual tiene permiso para ese tipo de episodio.
3. El privacy_mode del episodio permite recuperación para ese rol.
4. El propósito de uso es una tarea cívica autorizada y legítima.
5. El episodio no ha expirado según su retention_until.
6. El episodio no contiene datos que crucen límites de privacidad al mostrarse.

Si cualquiera de estas condiciones falla, el episodio no se recupera ni se menciona.

**Tipos de recall permitidos:**

- Por usuario: el mismo usuario consulta su historial autorizado.
- Por rol: roles con permiso consultan episodios de su ámbito (Secretaría, Comité, etc.).
- Por comunidad: análisis agregado anonimizado, solo en episodios públicos o confidenciales
  que cumplan el mínimo de contribuyentes únicos.

**Recall prohibido:**

- Mostrar conversaciones de una persona a otra persona, sin importar el rol.
- Usar episodios privados sin memoria en cualquier respuesta posterior.
- Recuperar episodios para construir perfiles individuales.
- Recuperar episodios para fines distintos a la tarea cívica solicitada.

---

## 6. Límites por rol

Cada rol tiene un alcance de recall diferente.
Ningún rol puede ver más allá de lo que le corresponde.

| Rol | Qué puede recuperar |
|---|---|
| Ciudadano / Ciudadana | Sus propios episodios públicos y confidenciales autorizados. |
| Secretaría | Episodios de registros, minutas y acuerdos de la comunidad, según permisos. |
| Coordinación | Episodios del ciclo cívico activo según permisos. |
| Comité | Episodios de propuestas, acuerdos y deliberaciones autorizadas. |
| Tesorería | Episodios con contexto financiero autorizado. |
| Validador | Episodios con evidencia bajo revisión, según permisos. |
| Financiador | Solo episodios de métricas públicas agregadas. |
| Admin técnico | Logs técnicos redactados sin contenido sensible. |
| Operador de piloto | Episodios de configuración inicial, sin contenido privado. |
| Visitante | Sin acceso a recall. Solo información pública visible. |

---

## 7. El Auditor: verificación antes del recall

El Auditor es el agente interno automático que verifica cada episodio antes de que
aparezca en una respuesta. No es un rol humano. No decide por la comunidad.
Solo aplica las reglas definidas en este documento y en el SOUL.md.

**Qué verifica el Auditor antes de permitir un recall:**

- community_id coincide con la comunidad activa.
- user_role tiene permiso para el episodio.
- privacy_mode del episodio es compatible con el uso solicitado.
- El episodio no ha expirado.
- La respuesta no expone datos personales no autorizados.
- El propósito del recall es cívico y legítimo.
- El episodio no pertenece a otra persona si el modo era privado.

Si el Auditor bloquea un recall, registra el intento como evento de auditoría sin guardar
el contenido del episodio bloqueado ni confirmar su existencia al usuario.

---

## 8. Casos prohibidos

Estos casos activan bloqueo automático sin excepción:

- Solicitar conversaciones, preguntas o actividad privada de otra persona.
- Intentar reconstruir la identidad de una persona a partir de episodios agregados.
- Usar episodios privados sin memoria en cualquier respuesta futura.
- Pedir al sistema que "recuerde" información que el usuario compartió en modo privado.
- Intentar acceder a episodios de otra comunidad.
- Usar recall para fines de vigilancia, perfilado o sanción individual.

---

## 9. UX requerida

**Antes de iniciar una conversación:**
El usuario debe ver el modo de privacidad activo y entender qué se guardará.
El selector de privacidad debe ser visible y comprensible para cualquier persona,
sin importar su nivel de alfabetización tecnológica.

**Durante la conversación:**
El indicador persistente de privacidad muestra siempre el modo activo.

**Antes de enviar:**
Confirmación de qué se guardará, quién podrá verlo y cuánto tiempo se conserva.

**Cuando se usa memoria en una respuesta:**
Etiqueta visible: "Usa memoria comunitaria autorizada" con fuentes y fecha.

**Cuando se bloquea un recall:**
Mensaje sin confirmar existencia del episodio bloqueado:
"No puedo mostrar conversaciones, preguntas o actividad privada de otras personas.
Puedo ayudarte a consultar información pública o fuentes disponibles para tu rol."

---

## Mensajes límite de memoria episódica

| Caso | Mensaje |
|---|---|
| Alguien pide ver conversaciones de otra persona | "No puedo mostrar conversaciones, preguntas o actividad privada de otras personas. Puedo ayudarte a consultar información pública o fuentes disponibles para tu rol." |
| Recall bloqueado por permisos de rol | "Esta información existe bajo un nivel de acceso que tu rol no puede consultar. Puedo buscar información pública relacionada." |
| Usuario quiere guardar algo en modo privado | "Este modo no guarda el contenido en la memoria de IAldea. Al cerrar la conversación, no podrá recuperarse después." |

---

## Reglas transversales de memoria

| Regla | Aplicación |
|---|---|
| Mínima información necesaria | Solo se guarda lo necesario para memoria cívica autorizada. |
| No perfilado individual | La memoria no se usa para construir perfiles personales ni para convertir IAldea en asistente personal. |
| Mismo contexto | El recall solo puede ocurrir dentro de la misma comunidad, rol permitido, privacy_mode y propósito legítimo. |
| No confirmar privados | Si alguien solicita conversaciones privadas de otra persona, IAldea no confirma si existen. |
| Auditor automático | El agente Auditor aplica reglas de acceso antes de recuperar o mostrar memoria. |
| Privado significa no recuperable | En modo privado sin memoria no se guarda contenido, resumen, embedding ni episodio. |
| Agregación segura | En confidencial comunitario, los patrones solo se muestran si cumplen el mínimo de contribuyentes únicos definido en policy_config.yaml. |

---

*episodic.md versión 1.0.0 — packages/memory-kernel/episodic.md*
*IAldea — ETH Cinco de Mayo, 2026*
