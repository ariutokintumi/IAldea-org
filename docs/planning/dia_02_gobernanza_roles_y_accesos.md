# Día 2 — Gobernanza, roles y accesos (IAldea)

> **Objetivo del día:** dejar definidos la **estructura comunitaria**, los **roles de usuario**, los **permisos**, los **niveles de acceso**, la **separación autoridad / ciudadanía**, y los modos **público / privado / confidencial** — listos para volcar a `policy_config.yaml` y al asistente no-code.  
> Referencias: [README.md](../../README.md) (privacidad, agentes), [plan_16_config_nocode.md](plan_16_config_nocode.md), [config/policy_config.example.yaml](../../config/policy_config.example.yaml).

---

## 1. Metas del Día 2 (checklist)

| Meta | Entregable concreto |
|------|---------------------|
| Estructura comunitaria | Modelo de **órganos** (asamblea, autoridades, comités, ciudadanía, externos) y cómo se mapean a **roles técnicos** en el sistema. |
| Roles de usuario | Catálogo de **roles considerados** + slugs estables + agrupación (autoridad / comité / ciudadanía / externo / operación). |
| Permisos | **Matriz permiso × rol** (booleana o niveles) alineada a capacidades del producto. |
| Niveles de acceso | **Niveles L0–L3** (o similar) sobre datos y acciones; qué rol entra en qué nivel. |
| Separación autoridad / ciudadanía | Reglas explícitas: **qué ve** cada bando, **qué no ve**, y **qué requiere umbral de agregación**. |
| Modos público / privado / confidencial | Definición operativa y **valor por defecto**; relación con roles y con el Agente Ciudadano vs Autoridad. |
| Identidad sin revelar persona | **ID o firma pseudónima** por contribuyente (vinculada a rol y comunidad), trazable para auditoría operativa y **no** reidentificable en agregados. |

---

## 2. Estructura comunitaria (modelo lógico)

La comunidad **no es plana**: IAldea refleja **gobierno y participación**, sin sustituir asambleas ni ley local.

```mermaid
flowchart TB
  ASM["Asamblea / decisión colectiva<br/>(fuera del software)"]
  AUT["Autoridades electas o reconocidas<br/>presidente, secretario, síndico, regidor…"]
  COM["Comités temáticos<br/>agua, obras, educación…"]
  CIU["Ciudadanía<br/>habitantes con voz consultiva"]
  EXT["Externos<br/>visitante, patrocinador, asesor"]
  OPS["Operación técnica<br/>admin, operador piloto"]

  ASM -.->|"delibera"| AUT
  ASM -.-> COM
  AUT --> COM
  CIU --> ASM
  EXT -.->|"solo si política lo permite"| CIU
  OPS -.->|"configura / ingiere / audita logs"| AUT
```

**Principio:** el software **registra, consulta y resume** según permisos; la **soberanía** sigue en la asamblea y en las normas comunitarias.

---

## 3. Roles a considerar (catálogo → slugs)

Cada persona tiene **un rol principal** en el sistema (y opcionalmente roles secundarios en una fase posterior). Los slugs van en minúsculas y sin espacios; la etiqueta visible puede ir en español en la UI.

| Rol (nombre de trabajo) | `slug` sugerido | Grupo |
|-------------------------|-----------------|--------|
| Presidente municipal / comunitario | `presidente` | autoridad |
| Secretario | `secretario` | autoridad |
| Miembro de comité | `comite_miembro` | comité |
| Regidor / concejal (donde aplique) | `regidor` | autoridad |
| Asesor (técnico o comunitario) | `asesor` | externo_proximo |
| Ciudadano | `ciudadano` | ciudadania |
| Joven | `joven` | ciudadania |
| Persona mayor | `adulto_mayor` | ciudadania |
| Visitante | `visitante` | externo |
| Administrador del sistema | `admin` | operacion |
| Operador piloto (cívico / ETH / partner) | `operador_piloto` | operacion |
| Patrocinador u observador externo | `observador_externo` | externo |

**Notas:**

- **Joven** y **adulto mayor** comparten la mayoría de permisos con **ciudadano** salvo que la comunidad active **políticas diferenciadas** (p. ej. menores: sin retención de memoria en modo público).
- **Visitante** y **observador_externo** suelen tener **L0/L1** muy acotados (solo lectura de material explícitamente público, sin feedback confidencial).
- **Asesor** puede leer más que un ciudadano **solo si** el comité lo delega por escrito en política (evitar “asesor omnisciente” por defecto).

---

## 4. Niveles de acceso (L0–L3)

Niveles son **abstracción** para implementar checks; no son “rangos morales”, son **control de superficie de ataque**.

| Nivel | Quién típico | Datos / acciones |
|-------|----------------|------------------|
| **L0** | Visitante, observador externo | Solo contenido marcado **público** y sin datos personales. Sin ingesta. |
| **L1** | Ciudadano, joven, adulto mayor | Chat y consulta según **modo de privacidad**; feedback según política; **no** ve agregados crudos de otros si la política lo restringe. |
| **L2** | Presidente, secretario, regidor, comité | Ver agregados (si `aggregate_visibility` lo permite), comparar escenarios, exportar informes, **no** modificar `policy` salvo que también sean admin. |
| **L3** | `admin`, `operador_piloto` (delegado) | Ingesta, cambio de configuración, gestión de roles, lectura de **logs de auditoría** según lo que la comunidad delegue al piloto. |

**Separación autoridad / ciudadanía (reglas cortas):**

- **Autoridad y comité (L2):** pueden ver **agregados** que cumplan umbral (`aggregation_threshold`) y políticas de visibilidad; **nunca** listas de “quién preguntó qué” en modo confidencial.
- **Ciudadanía (L1):** ve **sus propias** interacciones y respuestas citadas; agregados solo si la política dice `all` o equivalente explícito.
- **Externos (L0–L1 acotado):** sin acceso a minutas internas salvo **fuente pública** explícita.

---

## 5. Modos de privacidad (público / confidencial / privado sin memoria)

Alineado al README: `public` · `confidential_community` · `private_no_memory`.

| Modo | Qué se guarda | Quién puede usarlo típicamente | Riesgo si se malconfigura |
|------|----------------|----------------------------------|---------------------------|
| **Público** | Preguntas y respuestas en memoria citable | Acuerdos explícitos de transparencia | Reidentificación si se mezcla con otros datos. |
| **Confidencial comunitario** | Solo patrones agregados; **≥ N** contribuyentes para mostrar agregado | Por defecto recomendado para pulso ciudadano | Umbral mal puesto → filtrado de identidad. |
| **Privado, sin memoria** | Nada retenido tras la sesión | Temas sensibles, salud, conflictos | Menos trazabilidad; útil para consulta puntual. |

**Default recomendado en MVP:** `confidential_community` + `aggregate_visibility: authorities_only` hasta que la asamblea decida lo contrario por escrito.

---

## 6. Modelo de roles (entidad–relación simplificado)

```mermaid
erDiagram
  COMMUNITY ||--o{ MEMBERSHIP : has
  ROLE ||--o{ MEMBERSHIP : assigns
  PERSON ||--o{ MEMBERSHIP : holds

  COMMUNITY {
    string id
    string name
  }
  ROLE {
    string slug
    string access_level
  }
  MEMBERSHIP {
    string contributor_handle
    datetime valid_from
    datetime valid_to
  }
  PERSON {
    string pseudonym_id
    string role_slug_at_enrollment
  }
```

- **`PERSON`:** identidad **interna** de quien usa el sistema; no tiene por qué ser el nombre civil. Lo público y lo agregado usan solo **handles** opacos.
- **`MEMBERSHIP`:** une `PERSON` + `ROLE` + vigencia; puede registrarse el **rol declarado** al darse de alta para auditoría, sin exponerlo en pantallas ciudadanas.

### 6.1 Identidad pseudónima y “firma” de contribución (sin revelar quién es)

**Objetivo:** cada interacción que deja huella (pregunta, feedback, ingesta de documento, cambio de config) debe poder atribuirse a **un sujeto responsable ante el sistema** (trazabilidad, antiabuso), **sin** que en agregados o en la UI ciudadana aparezca el nombre real ni datos que permitan reidentificar con facilidad.

| Concepto | Definición breve |
|----------|------------------|
| **`contributor_handle` (ID opaco)** | Identificador estable **por persona y comunidad** (p. ej. UUID v4 generado al enrolarse, o derivado criptográficamente de un secreto de enrolamiento + `community_id` + factor de dispositivo). **No** debe incluir CURP, teléfono ni nombre. |
| **Prefijo de rol (solo operador / auditoría)** | Opción de mostrar internamente `ciudadano_8f3a1c` para distinguir cohortes; en **vistas ciudadanas** de modo confidencial, no listar handles individuales en agregados. |
| **“Firma” de acción** | En MVP: registrar `contributor_handle` + marca de tiempo + tipo de evento en **log de auditoría**. En fases posteriores: firma criptográfica (p. ej. Ed25519) ligada al handle para **no repudio** en ingestas sensibles, si la comunidad lo exige. |
| **Separación agregado vs operador** | Los **agregados** solo cuentan “N personas del rol X” o temas; los **operadores L3** pueden ver handles en logs para revertir vandalismo o trazabilidad de ingesta, según `policy_config`. |
| **Rotación y baja** | Política de revocación del handle al salir del cargo o del piloto; nuevas altas = nuevo handle (evita enlazar historiales indebidos). |

**Reglas que el taller debe fijar por escrito:**

1. ¿El enrolamiento es **presencial** (operador da de alta) o **autogestionado** con código de invitación por comité?  
2. ¿Los menores (`joven`) comparten política de handle con tutoría documentada fuera del software?  
3. ¿Qué eventos **exigen** handle visible solo a L3 (ingesta, cambio de SOUL, exportación masiva)?

---

## 7. Matriz de permisos (MVP — borrador para validar en taller)

**Leyenda visual:** ✅ permitido · ❌ denegado · ⚠️ solo con condición (texto entre paréntesis).

Las tablas anchas suelen **romperse en GitHub / móvil**; aquí van **dos tablas** (ciudadanía + externos | órgano + operación) y una **vista por fila** idéntica en contenido.

### 7.1 Ciudadanía, visita y observación

| Capacidad | ciudadano | joven | adulto_mayor | visitante | observador_externo |
|-----------|:---:|:---:|:---:|:---:|:---:|
| Consultar Agente Ciudadano (citas) | ✅ | ✅ | ✅ | ⚠️ (solo público) | ⚠️ (solo público) |
| Enviar feedback / pulso | ✅ | ⚠️ (edad / consentimiento) | ✅ | ❌ | ❌ |
| Ver agregados de feedback | ❌ | ❌ | ❌ | ❌ | ❌ |
| Agente Autoridad (escenarios / impacto) | ❌ | ❌ | ❌ | ❌ | ❌ |
| Exportar informes (PDF, etc.) | ❌ | ❌ | ❌ | ❌ | ❌ |
| Ingestar documentos al Kernel | ❌ | ❌ | ❌ | ❌ | ❌ |
| Cambiar `policy_config` / SOUL | ❌ | ❌ | ❌ | ❌ | ❌ |
| Ver logs de auditoría completos | ❌ | ❌ | ❌ | ❌ | ❌ |

### 7.2 Comité, autoridad, asesoría y operación

| Capacidad | comite_miembro | presidente | secretario | regidor | asesor | admin | operador_piloto |
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Consultar Agente Ciudadano (citas) | ✅ | ✅ | ✅ | ✅ | ⚠️ (alcance delegado) | ✅ | ✅ |
| Enviar feedback / pulso | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Ver agregados de feedback | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ |
| Agente Autoridad (escenarios / impacto) | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ |
| Exportar informes (PDF, etc.) | ⚠️ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Ingestar documentos al Kernel | ⚠️ | ✅ | ✅ | ❌ | ❌ | ✅ | ⚠️ (según mandato) |
| Cambiar `policy_config` / SOUL | ❌ | ⚠️ (dual control) | ✅ | ❌ | ❌ | ✅ | ❌ |
| Ver logs de auditoría completos | ❌ | ⚠️ | ✅ | ❌ | ❌ | ✅ | ⚠️ |

### 7.3 Misma matriz, una capacidad por bloque (lectura en móvil)

- **Consultar Agente Ciudadano (citas)** — ciudadano ✅ · joven ✅ · adulto_mayor ✅ · comite ✅ · presidente ✅ · secretario ✅ · regidor ✅ · asesor ⚠️ (alcance delegado) · visitante ⚠️ (solo público) · observador ⚠️ (solo público) · admin ✅ · operador_piloto ✅  
- **Enviar feedback / pulso** — ciudadano ✅ · joven ⚠️ (edad / consentimiento) · adulto_mayor ✅ · comite ✅ · presidente ✅ · secretario ✅ · regidor ✅ · asesor ❌ · visitante ❌ · observador ❌ · admin ✅ · operador_piloto ✅  
- **Ver agregados de feedback** — ciudadano ❌ · joven ❌ · adulto_mayor ❌ · comite ✅ · presidente ✅ · secretario ✅ · regidor ✅ · asesor ⚠️ · visitante ❌ · observador ❌ · admin ✅ · operador_piloto ✅  
- **Agente Autoridad (escenarios / impacto)** — ciudadano ❌ · joven ❌ · adulto_mayor ❌ · comite ✅ · presidente ✅ · secretario ✅ · regidor ✅ · asesor ⚠️ · visitante ❌ · observador ❌ · admin ✅ · operador_piloto ✅  
- **Exportar informes (PDF, etc.)** — ciudadano ❌ · joven ❌ · adulto_mayor ❌ · comite ⚠️ · presidente ✅ · secretario ✅ · regidor ✅ · asesor ❌ · visitante ❌ · observador ❌ · admin ✅ · operador_piloto ✅  
- **Ingestar documentos al Kernel** — ciudadano ❌ · joven ❌ · adulto_mayor ❌ · comite ⚠️ · presidente ✅ · secretario ✅ · regidor ❌ · asesor ❌ · visitante ❌ · observador ❌ · admin ✅ · operador_piloto ⚠️ (según mandato)  
- **Cambiar `policy_config` / SOUL** — ciudadano ❌ · joven ❌ · adulto_mayor ❌ · comite ❌ · presidente ⚠️ (dual control) · secretario ✅ · regidor ❌ · asesor ❌ · visitante ❌ · observador ❌ · admin ✅ · operador_piloto ❌  
- **Ver logs de auditoría completos** — ciudadano ❌ · joven ❌ · adulto_mayor ❌ · comite ❌ · presidente ⚠️ · secretario ✅ · regidor ❌ · asesor ❌ · visitante ❌ · observador ❌ · admin ✅ · operador_piloto ⚠️  

**Condiciones típicas (⚠️):**

- **Asesor:** solo documentos y comités explícitamente listados en `policy_config`.
- **Dual control:** dos firmas o dos roles `admin` para cambios sensibles (definir en taller si aplica).

---

## 8. Esquema de comunidad de ejemplo (YAML)

Copia base para `policy_config.yaml` o para el generador no-code. Ajustar nombres y listas en el taller.

```yaml
community:
  id: "san_juan_ejemplo"
  name: "San Juan Ejemplo"
  governance: "usos_y_costumbres"

# Niveles de acceso por slug (opcional; puede derivarse del rol)
access_levels:
  visitante: L0
  observador_externo: L0
  ciudadano: L1
  joven: L1
  adulto_mayor: L1
  comite_miembro: L2
  regidor: L2
  presidente: L2
  secretario: L2
  asesor: L1   # o L2 si la comunidad delega explícitamente
  admin: L3
  operador_piloto: L3

roles:
  authorities: [presidente, secretario, regidor]
  committees: [comite_agua, comite_obras]
  admin: [secretario]
  pilot_operators: [operador_piloto]

privacy:
  default_mode: "confidential_community"
  aggregation_threshold: 3
  aggregate_visibility: "authorities_only"
  # Identidad pseudónima: ver §6.1 del plan Día 2
  contributor_identity:
    scheme: "opaque_uuid_per_enrollment"  # alternativa: clave derivada HKDF (community + secreto + dispositivo)
    store_role_slug_with_membership: true   # para auditoría; no mostrar en agregados
    show_handle_in_ui:
      citizen_self: true          # "tu id interno" opcional
      authority_aggregates: false # agregados sin listar handles
      operator_audit_logs: true   # L3 ve handle en logs de ingesta / cambios
    rotate_handle_on_role_change: true

role_permissions:
  citizen:
    can_query: true
    can_submit_feedback: true
    can_view_aggregates: false
    can_view_documents: true
  authority:
    can_query: true
    can_submit_feedback: true
    can_view_aggregates: true
    can_view_documents: true
    can_compare_scenarios: true
    can_export_reports: true
  admin:
    can_modify_config: true
    can_ingest_documents: true
    can_manage_roles: true
```

**Mapeo de roles del taller → `role_permissions`:** en el MVP, **joven** y **adulto_mayor** heredan el bloque `citizen` salvo excepciones; **comite_miembro** puede mapearse a `authority` o a un tercer bloque `committee` si el código lo soporta (Día 2 puede decidir si unifican en `authority` temporalmente).

---

## 9. User stories (para validar en Día 2)

1. **Como** secretaria **quiero** que solo presidenta, regidores y yo veamos agregados de pulso ciudadano **para** preparar la asamblea sin exponer nombres individuales.  
2. **Como** ciudadana **quiero** preguntar en mixteco y recibir respuesta con cita a acta **para** confiar en la fuente sin ir al palacio municipal.  
3. **Como** comité de agua **quiero** usar el Agente Autoridad para comparar dos escenarios de obra **para** llevar a la asamblea pros/contras documentados, no una “orden” del sistema.  
4. **Como** visitante **quiero** ver solo la página de bienvenida y documentos marcados públicos **para** no acceder a minutas internas por error.  
5. **Como** admin **quiero** registrar quién subió cada PDF **para** auditar ingesta sin usar eso como denuncia automática en el chat.  
6. **Como** joven **quiero** usar el chat en modo privado sin memoria cuando pregunto un tema sensible **para** que no quede rastro en el Kernel.  
7. **Como** operador piloto **quiero** ingestar el anuario INEGI con rol explícito **para** que la comunidad sepa que la fuente es externa y revisable.  
8. **Como** observador externo **quiero** acceso de solo lectura a indicadores acordados **para** evaluar el piloto sin ver feedback identificable.  
9. **Como** operadora **quiero** que cada PDF subido quede ligado a un **handle opaco** y al rol declarado **para** auditar sin publicar nombres en el chat ciudadano.  
10. **Como** ciudadano **quiero** ver solo mi propio handle en ajustes **para** saber que mis aportes están contados sin exponerme en tableros agregados.

---

## 10. Salidas del taller (Día 2) — marcar al cerrar sesión

- [ ] **Modelo de roles** aprobado por el equipo (esta sección + diagrama ER).
- [ ] **Política de `contributor_handle` / firma** acordada (enrolamiento, rotación, quién ve handles — §6.1).
- [ ] **Matriz de permisos** consensuada (tabla §7 actualizada).
- [ ] **Esquema YAML** de ejemplo validado con una comunidad ficticia.
- [ ] **User stories** priorizadas (MVP vs post-MVP).
- [ ] Lista de cambios a introducir en `plan_16_config_nocode.md` y en el **configurador web** (preguntas del asistente).

---

*Documento de trabajo — Día 2. Sin nombres de personas; ajustar tras decisión comunitaria en despliegue real.*
