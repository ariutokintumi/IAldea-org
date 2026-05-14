# Día 3 — Arquitectura de subagentes con niveles de acceso (WhatsApp Bot)

**Estado:** borrador de ingeniería para cuando el repo abra entregables **Día 3+** según [`CONTEXTO-POPUP-VILLAGE.md`](../../CONTEXTO-POPUP-VILLAGE.md) §10–11.

**Alineación Día 2:** niveles L0–L3, roles, `contributor_handle`, WhatsApp y política machine-enforceable en [`dia_02_gobernanza_roles_y_accesos.md`](dia_02_gobernanza_roles_y_accesos.md) y `config/policy_config.example.yaml`.

---

## Resumen

Chatbot de WhatsApp orquestado por **ROLES**. El sistema identifica al usuario, valida su nivel de acceso y lo deriva a un **Orquestador dedicado** (ej: `orc_ciudadano`, `orc_secretaria`). El acceso se valida **antes** de tocar cualquier LLM. Los mensajes entre orquestadores y subagentes viajan encriptados a través del **Conmutador**, que actúa como túnel bidireccional seguro. Cada orquestador posee las llaves de sus propios subagentes.

---

## Principios de diseño

| Principio | Descripción |
|-----------|-------------|
| **Auth primero** | El nivel de acceso se resuelve en Node.js, nunca por el LLM |
| **Orquestadores por Rol** | Cada rol oficial tiene su propio orquestador con prompt y contexto aislado |
| **Llaves por Orquestador** | Cada orquestador posee las llaves de sus propios subagentes |
| **Conmutador como túnel** | Encripta y desencripta mensajes en ambas direcciones — el mensaje no circula en claro *en el segmento* orquestador ↔ subagente (ver nota de amenazas abajo) |
| **Subagentes compartibles** | Algunos subagentes pueden ser accedidos por más de un orquestador si comparten llave |
| **Zero-token en rechazo** | Usuarios sin acceso no consumen tokens de LLM |

**Nota de modelo de amenazas:** el tráfico **WhatsApp ↔ tu backend** ya va sobre TLS. El Conmutador añade aislamiento **entre** orquestador y workers de subagente (p. ej. procesos distintos, redes distintas). Si ORC2 envía al Conmutador “mensaje en claro + key” en la misma máquina, el riesgo es el **proceso** y la **memoria** compartida; para máxima separación, valorar **wrapping** de clave (KMS/HSM) y canales IPC cifrados o mTLS entre servicios.

---

## Flujo completo

```mermaid
flowchart TD
    A([👤 Usuario\n+ Teléfono]) -->|WhatsApp Mensaje| B[WhatsApp API]
    B --> C[Check User Access\nNode.js]

    C -->|L0| REJ[Rechazo zero-token]
    C -->|L1-L3| ROUTER{Router de Rol\nNode.js}

    subgraph ORCS["🛡️ Orquestadores Dedicados"]
        ROUTER -->|ciudadano| ORC_C[orc_ciudadano]
        ROUTER -->|secretaria| ORC_S[orc_secretaria]
        ROUTER -->|coordinacion| ORC_CO[orc_coordinacion]
        ROUTER -->|...otros| ORC_N[Orquestador N]
    end

    ORC_C -->|Msg + Key| SW
    ORC_S -->|Msg + Key| SW
    ORC_CO -->|Msg + Key| SW
    ORC_N -->|Msg + Key| SW

    subgraph WORKERS["⚙️ Workers"]
        SW[🔀 Conmutador\nEncrypt ↕ Decrypt]
        SW -->|🔒| Sub1[Subagente 1]
        SW -->|🔒| Sub2[Subagente 2]
        Sub1 -->|🔒| SW
        Sub2 -->|🔒| SW
    end

    SW -->|Respuesta en claro| ORCS
    ORCS --> RESP([✅ Respuesta al usuario])
```

---

## Detalle: Check User Access Level (Node.js)

Primer filtro — decide a qué capa va el mensaje sin tocar ningún LLM.

```mermaid
flowchart LR
    A[Mensaje\n+ número de teléfono] --> B[(Base de datos\nde usuarios)]
    B --> C{¿Usuario existe\ny tiene acceso?}
    C -->|No| D[Rechazo\nsin LLM]
    C -->|Sí| E{¿Qué nivel?}
    E -->|Nivel básico| F[→ Orquestador 1\nCapa No-AI]
    E -->|Nivel con IA| G[→ Orquestador 2\nCapa IA]
```

Mapeo sugerido: **L0** → Rechazo inmediato; **L1-L3** → Router de Rol identifica el `slug` del usuario y lo deriva al orquestador correspondiente (ej. `ciudadano` → `orc_ciudadano`).

---

## Detalle: los orquestadores por rol

Cada orquestador es una instancia aislada con un **System Prompt** que define su comportamiento según la [Matriz de comportamiento](docs/roles/matriz-comportamiento-por-rol.md).

- **orc_ciudadano:** Tono cercano, limitado a info pública.
- **orc_secretaria:** Tono formal, acceso a Kernel de actas y minutas.
- **orc_tesoreria:** Foco en viabilidad y registro financiero.
- **...etc.**

---

## Detalle: el Conmutador (túnel bidireccional)

El Conmutador es el componente de seguridad de la Capa IA. No decide a qué subagente ir — eso ya lo sabe el Orquestador 2. Su responsabilidad es el **canal cifrado** entre orquestador y subagente según el diseño elegido.

```mermaid
sequenceDiagram
    participant ORC2 as Orquestador 2
    participant SW as 🔀 Conmutador
    participant SUB as Subagente X

    ORC2->>SW: Mensaje en claro\n+ sub destino + key + prompt
    Note over SW: Encripta el mensaje\ncon la key del subagente
    SW->>SUB: 🔒 Mensaje encriptado

    Note over SUB: Procesa con su\npropio contexto y tools
    SUB->>SW: 🔒 Respuesta encriptada

    Note over SW: Desencripta la respuesta
    SW->>ORC2: Respuesta en claro
```

### Lo que el Conmutador hace en cada dirección

| Dirección | Acción |
|-----------|--------|
| Orquestador → Subagente | Encripta el mensaje con la key del subagente destino |
| Subagente → Orquestador | Desencripta la respuesta y la devuelve en claro al orquestador |

### Lo que el Conmutador NO hace

- No decide a qué subagente ir
- No almacena mensajes ni llaves (por diseño; si persiste algo, debe ser acotado y auditado)
- No tiene lógica de negocio
- No puede ser interrogado sobre otros subagentes

---

## Detalle: llaves — quién tiene qué

```mermaid
flowchart LR
    subgraph ORC1["Orquestador 1"]
        K1A[Key Sub-básico A]
        K1B[Key Sub-básico B]
        K1S[Key Sub-compartido]
    end

    subgraph ORC2["Orquestador 2"]
        K2A[Key Sub-IA exclusivo 1]
        K2B[Key Sub-IA exclusivo 2]
        K2S[Key Sub-compartido]
    end

    K1A --> SBA[Sub básico A]
    K1B --> SBB[Sub básico B]
    K1S --> SBC[Sub compartido]
    K2A --> SIA[Sub IA exclusivo 1]
    K2B --> SIB[Sub IA exclusivo 2]
    K2S --> SBC
```

El sub compartido puede ser invocado por ambos orquestadores porque ambos tienen su llave. Ningún orquestador puede invocar los subagentes exclusivos del otro — no tiene la llave.

---

## Flujo completo de una sesión (Capa IA)

```mermaid
sequenceDiagram
    actor Usuario
    participant WA as WhatsApp API
    participant Node as Node.js\nCheck Access Level
    participant ORC2 as Orquestador 2\nCapa IA
    participant SW as 🔀 Conmutador
    participant SUB as Subagente

    Usuario->>WA: Mensaje + teléfono
    WA->>Node: Webhook
    Node->>Node: Valida usuario y nivel

    alt Sin acceso
        Node-->>WA: Rechazo sin LLM
        WA-->>Usuario: "Sin acceso"
    else Capa No-AI
        Node->>Node: Orquestador 1 responde
        Node-->>Usuario: Respuesta básica
    else Capa IA
        Node->>ORC2: Mensaje + nivel de acceso
        ORC2->>ORC2: Selecciona subagente\ny recupera su key
        ORC2->>SW: Mensaje en claro + key + prompt
        SW->>SW: Encripta mensaje
        SW->>SUB: 🔒 Mensaje encriptado
        SUB->>SUB: Procesa con contexto\ny tools propias
        SUB->>SW: 🔒 Respuesta encriptada
        SW->>SW: Desencripta respuesta
        SW->>ORC2: Respuesta en claro
        ORC2->>WA: Respuesta formateada
        WA->>Usuario: ✅ Respuesta final
    end
```

---

## Reglas de oro

1. **Node.js decide el nivel** — el LLM nunca toma decisiones de acceso.
2. **Rechazo sin tokens** — usuarios no autorizados nunca llegan al LLM.
3. **Las llaves viven en los orquestadores** — el conmutador solo las usa en tránsito, no las almacena (idealmente ni en logs).
4. **El mensaje no viaja en claro** en el segmento que el Conmutador protege entre orquestador y subagente.
5. **Orquestador 1 no puede invocar subagentes de IA** — no tiene sus llaves.
6. **Orquestador 2 no puede invocar subagentes básicos exclusivos** — no tiene sus llaves.
7. **Subagentes compartidos** son posibles si ambos orquestadores tienen la llave del subagente.
8. **Cada subagente es ciego** — no sabe quién lo invocó ni que existen otros subagentes (ajustar si necesitas auditoría: entonces un **claim** mínimo firmado puede viajar cifrado).

---

## Próximos pasos sugeridos

- [ ] Definir qué subagentes son exclusivos de cada orquestador y cuáles se comparten
- [ ] Elegir algoritmo de encriptación para el Conmutador (recomendado: **AES-256-GCM** con nonces únicos por mensaje)
- [ ] Definir el system prompt base de cada subagente
- [ ] Decidir qué tools tiene disponible cada subagente por nivel (alineado a `policy_config`)
- [ ] Configurar DB de usuarios con campo `nivel_acceso` (y vínculo a rol / L0–L3)
- [ ] Implementar el Conmutador como servicio independiente con cifrado bidireccional
- [ ] Implementar los dos orquestadores con sus respectivos keystores
- [ ] Testear flujos por nivel antes de producción

---

*Documento aportado por el equipo; integrado al planning del repo para revisión en Día 3.*
