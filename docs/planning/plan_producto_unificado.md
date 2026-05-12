# 🏘️ IAldea Comunidad — Producto Unificado

> **Un solo producto que combina las 4 ideas seleccionadas en una plataforma integral para líderes de comunidades de hasta 500 personas.**

---

## El Contexto Real

Eres líder de una comunidad de 500 personas. Tu día a día:

| Área | Problemas reales |
|---|---|
| 🌾 **Producción** | Coordinar cosechas, riego, faenas, tequios |
| 🛡️ **Seguridad** | Delincuencia, rondas comunitarias, emergencias |
| 🏗️ **Infraestructura** | Caminos, agua, drenaje, electrificación |
| 🏪 **Comercio** | Mercados, precios, rutas de distribución |
| ⚡ **Energía** | Paneles solares, red eléctrica, costos |
| ⛏️ **Minería** | Concesiones, impacto ambiental, regulación |
| 🌊 **Desastres naturales** | Lluvias, deslaves, sequías, planes de emergencia |
| 📚 **Educación** | Escuelas multigrado, becas, infraestructura escolar, calendario agrícola vs escolar |
| 💼 **Empleo** | Migración laboral, oficios locales, programas de capacitación, jornaleros |
| 🏥 **Salud** | Clínica rural, brigadas médicas, vacunación, embarazos, enfermedades crónicas |

**El problema:** Toda esta información vive en papeles sueltos, memorias de personas, audios de WhatsApp y actas que nadie encuentra. Cada cambio de autoridad pierde continuidad. Y tú no eres ingeniero — necesitas algo que **funcione sin manual**.

---

## La Solución: IAldea Comunidad

Un producto con **4 módulos integrados** que se alimentan entre sí:

```mermaid
graph TB
    subgraph "📱 IAldea Comunidad"
        direction TB
        
        subgraph "MÓDULO A — Captura"
            A1["📸 Foto de actas"]
            A2["🎙️ Audio de asambleas"]
            A3["📄 PDFs y documentos"]
        end

        subgraph "MÓDULO B — Inteligencia"
            B1["🔮 Análisis de impacto<br/>antes de decidir"]
            B2["📊 Mapa de conexiones<br/>entre problemas"]
        end

        subgraph "MÓDULO C — Comunicación"
            C1["🌐 Traducción<br/>lenguas originarias"]
            C2["💬 Chat bilingüe<br/>con ciudadanos"]
        end

        subgraph "MÓDULO D — Configuración"
            D1["🛡️ Reglas de la<br/>comunidad (sin código)"]
            D2["✅ Simulador de<br/>seguridad"]
        end
    end

    A1 --> B1
    A2 --> B1
    A3 --> B1
    B1 --> C2
    D1 --> B1
    D1 --> C2
    C1 --> C2

    style A1 fill:#E89B3C,color:#1B1A17
    style B1 fill:#1E4D5C,color:#fff
    style C1 fill:#B8482E,color:#fff
    style D1 fill:#4A7C59,color:#fff
```

---

## Un Día en la Vida del Líder (con IAldea)

```mermaid
sequenceDiagram
    actor L as 👤 Líder Comunitario
    participant IA as 📱 IAldea
    participant MEM as 💾 Memoria<br/>Comunitaria
    participant CIT as 👥 Ciudadanos

    Note over L: 7:00 AM — Mañana
    L->>IA: 📸 Fotografía el acta de la<br/>reunión de anoche sobre minería
    IA->>MEM: OCR → texto indexado<br/>(funciona sin internet)

    Note over L: 9:00 AM — Decisión urgente
    L->>IA: "Quiero reasignar $50k del<br/>fondo de infraestructura al<br/>muro de contención por lluvias"
    IA->>MEM: Busca conexiones en el grafo
    IA-->>L: 📊 Reporte de Impacto:<br/>• ⚠️ El camino a la mina depende<br/>  de ese fondo (acta Mar 2026)<br/>• 💰 Proveedor ya cotizó $38k<br/>• 👥 12 familias en zona de riesgo<br/>• 📜 Protección Civil tiene<br/>  programa de apoyo para muros

    Note over L: 11:00 AM — Asamblea
    L->>IA: 🎙️ Graba la asamblea<br/>(2 horas, en Mixteco y Español)
    IA->>IA: Transcribe + detecta idiomas
    IA->>MEM: Almacena con metadatos

    Note over L: 3:00 PM — Consulta ciudadana
    CIT->>IA: 🌐 (en Mixteco) "¿Cuándo van<br/>a arreglar el camino?"
    IA->>MEM: Busca información
    IA-->>CIT: 🌐 (en Mixteco + Español)<br/>"El comité de obras reportó<br/>avance del 40% en la última acta"<br/>📎 Fuente: acta_mayo_2026.pdf

    Note over L: 6:00 PM — Configuración
    L->>IA: 🛡️ "Agrega a temas prohibidos:<br/>la disputa con San Pedro"
    IA->>IA: Actualiza SOUL.md<br/>Ejecuta simulación de prueba
    IA-->>L: ✅ Regla activada.<br/>10/10 pruebas pasaron.
```

---

## Los 4 Módulos en Detalle

### Módulo A: Captura (Ingesta Multimodal Offline)

**Para qué:** Digitalizar toda la memoria de la comunidad sin necesitar internet.

```mermaid
graph LR
    subgraph "Entrada"
        A["📸 Foto"] 
        B["🎙️ Audio"]
        C["📄 PDF"]
    end
    subgraph "Procesamiento LOCAL"
        D["OCR / Whisper.cpp"]
        E["Limpieza + metadatos"]
    end
    subgraph "Resultado"
        F["📂 Documento indexado<br/>y buscable"]
    end
    A --> D --> E --> F
    B --> D
    C --> D
```

**Casos de uso por área de tu comunidad:**

| Área | Qué capturas | Resultado |
|---|---|---|
| 🌾 Producción | Actas de acuerdo sobre parcelas, tequios | Historial buscable de acuerdos agrícolas |
| 🛡️ Seguridad | Minutas de ronda comunitaria | Registro de incidentes y patrones |
| 🏗️ Infraestructura | Cotizaciones, avances de obra | Seguimiento de proyectos con evidencia |
| ⛏️ Minería | Oficios de SEMARNAT, concesiones | Archivo legal organizado |
| 🌊 Desastres | Planes de emergencia, mapas de riesgo | Información accesible en crisis |

**Requisitos mínimos:** Laptop o teléfono con cámara. **No necesita internet.**

---

### Módulo B: Inteligencia (Análisis de Impacto)

**Para qué:** Antes de decidir algo, ver qué más se afecta.

```mermaid
graph TD
    Q["❓ Propuesta:<br/>'Reasignar fondo de<br/>infraestructura al<br/>muro de contención'"] --> SCAN["🔍 Escaneo del<br/>grafo comunitario"]
    
    SCAN --> R1["⚠️ Conflicto<br/>Acuerdo previo<br/>destinó ese fondo<br/>al camino"]
    SCAN --> R2["💰 Recurso<br/>Proveedor del camino<br/>ya tiene cotización<br/>por $38k"]
    SCAN --> R3["👥 Población<br/>12 familias<br/>en zona de riesgo<br/>por lluvias"]
    SCAN --> R4["📜 Oportunidad<br/>Protección Civil<br/>tiene programa de<br/>apoyo para muros"]
    SCAN --> R5["🏗️ Proyecto<br/>Camino a la mina<br/>se detendría<br/>(avance 40%)"]

    style Q fill:#E89B3C,color:#1B1A17
    style R1 fill:#B8482E,color:#fff
    style R4 fill:#4A7C59,color:#fff
```

**Ejemplo de reporte generado:**

```
┌──────────────────────────────────────────────────┐
│ 🔮 ANÁLISIS DE IMPACTO                          │
│ "Reasignar $50k infraestructura → muro"         │
├──────────────────────────────────────────────────┤
│                                                  │
│ RESUMEN RÁPIDO                                   │
│ ┌────────────┬──────────┬───────────┐            │
│ │ Tipo       │ Cantidad │ Severidad │            │
│ ├────────────┼──────────┼───────────┤            │
│ │ ⚠️ Conflicto│ 1       │ 🔴 Alta   │            │
│ │ 💰 Recurso  │ 1       │ 🟡 Media  │            │
│ │ 👥 Afectados│ 12 fam  │ 🔴 Alta   │            │
│ │ 📜 Oportun. │ 1       │ 🟢 Buena  │            │
│ │ 🏗️ Proyecto │ 1       │ 🟡 Media  │            │
│ └────────────┴──────────┴───────────┘            │
│                                                  │
│ ⚠️ Este reporte NO es una recomendación.         │
│ La decisión corresponde a la asamblea.           │
│                                                  │
│ [📄 Imprimir]  [📤 Compartir]                    │
└──────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> IAldea **nunca** dice "deberías hacer X". Solo muestra lo que está conectado para que **tú y la asamblea** decidan con más información.

---

### Módulo C: Comunicación (Traducción + Chat Bilingüe)

**Para qué:** Que todos los ciudadanos accedan a la información en su lengua.

```mermaid
graph TB
    subgraph "Ciudadano pregunta"
        A["🗣️ Pregunta en<br/>Mixteco/Náhuatl/Zapoteco"]
    end
    
    subgraph "Sistema Híbrido"
        B["🤖 Traducción IA<br/>(automática)"]
        C{"¿Confianza<br/>≥ 70%?"}
        D["👩‍🏫 Traductor<br/>comunitario<br/>(humano)"]
        E["📚 Memoria de<br/>traducciones<br/>validadas"]
    end
    
    subgraph "Respuesta"
        F["💬 Respuesta bilingüe<br/>(lengua + español)<br/>con fuente citada"]
    end

    A --> E
    E -->|encontrada| F
    E -->|no encontrada| B
    B --> C
    C -->|Sí| F
    C -->|No| D
    D --> F
    D -->|guarda| E

    style A fill:#1E4D5C,color:#fff
    style F fill:#4A7C59,color:#fff
    style D fill:#B8482E,color:#fff
```

**Escenario real:**

| Situación | Sin IAldea | Con IAldea |
|---|---|---|
| Abuela mixteca quiere saber si hay programa de apoyo para techo | Camina 2 horas al municipio, no la entienden bien | Pregunta en Mixteco por chat, recibe respuesta bilingüe con fuente |
| Jornalero pregunta cuándo es la asamblea | Depende del rumor de boca en boca | Respuesta inmediata con fecha, hora y lugar citando la convocatoria |
| Comité necesita explicar el presupuesto | Documento en español que pocos leen | Resumen en lengua originaria validado por traductor local |

---

### Módulo D: Configuración (No-Code)

**Para qué:** Tú defines las reglas de IAldea sin necesitar un ingeniero.

```mermaid
graph LR
    subgraph "7 Pasos Simples"
        S1["1️⃣ Tu comunidad"] --> S2["2️⃣ Idioma y tono"]
        S2 --> S3["3️⃣ Temas OK / prohibidos"]
        S3 --> S4["4️⃣ Privacidad"]
        S4 --> S5["5️⃣ Roles"]
        S5 --> S6["6️⃣ Fuentes confiables"]
        S6 --> S7["7️⃣ Confirmar"]
    end
    
    S7 --> OUT["📄 Configuración<br/>lista en 15 min"]

    style S1 fill:#E89B3C,color:#1B1A17
    style OUT fill:#4A7C59,color:#fff
```

**Configuración para tu comunidad específica:**

| Pregunta | Tu respuesta probable |
|---|---|
| ¿Qué temas puede tocar IAldea? | Producción, infraestructura, comercio, energía, trámites |
| ¿Qué temas NUNCA? | Diagnósticos médicos, consejos legales, acusaciones, electoral |
| Temas sensibles locales | Disputa minera con empresa X, conflicto de tierras con comunidad Y |
| ¿Cómo manejar seguridad/delincuencia? | Solo información agregada ("se reportaron 5 incidentes este mes"), nunca nombres ni acusaciones |
| ¿Desastres naturales? | Información de protección civil SÍ, diagnósticos de riesgo estructural NO (requiere experto) |

**Reglas que NUNCA se desactivan** (sin importar lo que configures):

```
🔒 No dar consejos legales
🔒 No dar diagnósticos médicos
🔒 No validar acusaciones
🔒 No recomendar votos
🔒 No identificar personas en reportes agregados
🔒 Siempre citar fuentes
🔒 Registrar todos los cambios de configuración
```

---

## Arquitectura Unificada

Esta sección define **qué hace cada capa**, sobre todo **Graph** (tres piezas), **quién es el agente principal**, **quién filtra** y **qué herramientas** encajan con el MVP offline-first. Detalle técnico paralelo: [docs/architecture.md](../architecture.md).

### Diagrama de capas y datos (vista global)

Flujo: **captura → Kernel → indexación en Graph → agentes consultan Graph → borrador → Auditor → usuario**. El configurador y el simulador **no** están en el camino en vivo de cada mensaje; definen y prueban las reglas del Auditor.

```mermaid
flowchart TB
    subgraph EN["ENTRADA"]
        I1["📸 Fotos"]
        I2["🎙️ Audio"]
        I3["📄 PDFs"]
        I4["💬 Chat ciudadano"]
        I5["❓ Consulta impacto"]
    end

    subgraph K["CAPA 1 — KERNEL"]
        K1["OCR · Tesseract"]
        K2["STT · Whisper.cpp"]
        K3[(SQLite versionado<br/>chunks + docs)]
    end

    subgraph G["CAPA 2 — GRAPH"]
        G1["Grafo de conocimiento<br/>nodos + aristas"]
        G2["Búsqueda vectorial<br/>RAG por significado"]
        G3["Propagación de impacto<br/>recorrido + informe"]
    end

    subgraph AG["CAPA 3 — AGENTES"]
        A3["Motor traducción<br/>híbrido · idioma"]
        A1["Agente Ciudadano<br/>citas + política ciudadana"]
        A2["Agente Autoridad<br/>escenarios + impacto"]
    end

    subgraph SF["CAPA 4 — SAFETY"]
        S2["Configurador no-code<br/>SOUL + YAML"]
        S3["Simulador<br/>regresión políticas"]
        S1["Auditor<br/>salida obligatoria"]
    end

    OUT["✅ Respuesta al usuario"]

    I1 --> K1
    I3 --> K1
    I2 --> K2
    K1 --> K3
    K2 --> K3

    K3 -->|"indexa / enlaza"| G1
    K3 -->|"embeddings"| G2

    I4 --> A3
    A3 --> A1
    A1 --> G2
    A1 --> G1

    I5 --> A2
    A2 --> G3
    G3 --> G1
    G3 --> G2
    A2 --> G2

    A1 --> S1
    A2 --> S1
    A3 -.->|"texto final<br/>pasa por"| S1
    S2 --> S1
    S2 --> S3
    S1 --> OUT

    style K3 fill:#E89B3C,color:#1B1A17
    style G1 fill:#1E4D5C,color:#fff
    style G2 fill:#1E4D5C,color:#fff
    style G3 fill:#1E4D5C,color:#fff
    style A3 fill:#B8482E,color:#fff
    style S1 fill:#4A7C59,color:#fff
    style S2 fill:#6b9c7a,color:#1B1A17
```

### Flujo por rol (dos caminos claros)

```mermaid
sequenceDiagram
    autonumber
    participant U as Usuario
    participant T as Traducción híbrida
    participant AC as Agente Ciudadano
    participant AA as Agente Autoridad
    participant R as Graph G1+G2
    participant P as Propagación G3
    participant AUD as Auditor

    Note over U,AUD: Camino ciudadano (chat bilingüe)
    U->>T: mensaje (lengua A)
    T->>AC: normalizado / español si aplica
    AC->>R: consulta híbrida estructura + vectores
    R-->>AC: fragmentos + nodos citables
    AC-->>T: borrador respuesta
    T-->>AUD: salida (bilingüe si aplica)
    AUD-->>U: respuesta validada o rechazo educado

    Note over U,AUD: Camino autoridad (análisis de impacto)
    U->>AA: propuesta o pregunta de impacto
    AA->>P: semilla NLP + nodos clave
    P->>R: ampliar evidencia en grafo y textos
    R-->>P: trayectorias + documentos
    P-->>AA: mapa de impacto (sin recomendar)
    AA-->>AUD: informe borrador
    AUD-->>U: informe validado
```

### Qué es la capa Graph (las tres cajas)

| Pieza | Qué es | Qué no es |
|-------|--------|-----------|
| **G1 · Grafo de conocimiento** | Nodos tipados (acuerdo, proyecto, comité, recurso, documento, riesgo…) y **aristas con significado** para recorrer dependencias y trazabilidad. | Un segundo almacén de PDFs; lo no modelado como nodo/arista no se “recorre”. |
| **G2 · Búsqueda vectorial** | Embeddings de **chunks** del Kernel; recuperación **por significado** (RAG) para citar actas aunque el usuario use otras palabras. | Sustituto del grafo relacional; convive en **híbrido** con G1. |
| **G3 · Propagación de impacto** | Algoritmo (p. ej. BFS/DFS acotado) sobre G1, a veces enriquecido con evidencia de G2; arma el mapa “qué más está conectado” a una medida propuesta. | **No recomienda** decisión; solo ilumina conexiones ya documentadas (véase [plan_08_analisis_impacto.md](plan_08_analisis_impacto.md)). |

**Kernel vs Graph:** el Kernel responde *qué texto tenemos y con qué versión*; el Graph responde *cómo encajan las piezas entre sí* y *qué fragmentos parecen relevantes por significado*.

### Agentes: principal, idioma y filtro

| Rol en producto | Componente | Función |
|-----------------|------------|---------|
| **Agente principal (ciudadanía)** | Agente Ciudadano | Respuestas con **citas**, trámites/acuerdos públicos, feedback según privacidad; comparte política de acceso **ciudadana**. |
| **Agente principal (autoridad / comité)** | Agente Autoridad | Asambleas, **2–3 escenarios** no críticos, agregados, borradores; orquesta **G3** en consultas de impacto. |
| **Idioma (no es “el agente”)** | Motor traducción híbrido | Pre/post: detección de lengua, traducción, memoria de frases validadas por humanos; **no** decide política de seguridad. |
| **Filtro duro de salida** | Auditor + SOUL + `policy_config` | **Última puerta**: legal/médico/electoral fuera de alcance, acusaciones, fugas de privacidad, alucinaciones, citas faltantes. |
| **Opcional** | Clasificador ligero pre-LLM | Corta intents prohibidos **antes** del modelo (ahorro y claridad). |
| **Definición / QA de políticas** | Configurador no-code + Simulador | El configurator **alimenta** reglas del Auditor; el simulador **prueba** escenarios; no interceptan cada mensaje en producción. |

**En una frase:** *Ciudadano u Autoridad redactan; Traducción adapta lengua; Auditor permite o bloquea la salida.*

### Herramientas recomendadas (MVP alineado a este documento)

| Capa / pieza | Herramienta | Motivo breve |
|--------------|-------------|----------------|
| Kernel | **SQLite** | Portable, offline, un archivo por comunidad. |
| Grafo G1 + G3 | **NetworkX** (+ tablas en SQLite si se persiste) | Sin servidor de grafo; suficiente para demos y pueblos pequeños. |
| Vectores G2 | **Chroma embedded** (o similar respaldado en SQLite) | Sin GPU obligatoria; encaja laptop 8 GB. |
| API | **FastAPI** | Orquestación NLP y agentes cuando exista `apps/api`. |
| Ingesta | **Tesseract**, **Whisper.cpp** | Offline ([plan_01_ingesta_multimodal.md](plan_01_ingesta_multimodal.md)). |
| LLM / traducción | **Ollama o API** + memoria humana | Configurable por comunidad. |

**GIS (MDT, riesgo, etc.):** pueden modelarse como nodos `Location` / `PublicSource` enlazados en G1 y citarse como cualquier fuente; complementan pero no sustituyen acuerdos internos.

### Objetivo de paquetes en monorepo (referencia)

| Carpeta | Contenido previsto |
|---------|-------------------|
| `packages/memory-kernel/` | SQLite, documentos, chunks, versiones, auditoría. |
| `packages/graph/` | Modelo nodos/aristas, propagación G3. |
| `packages/retrieval/` | BM25 + vectores + fusión híbrida (G2). |
| `packages/agents/` | Orquestación Agente Ciudadano / Autoridad. |
| `packages/civic-safety/` | Auditor, clasificadores, simulador. |
| `packages/connectors/` | INEGI, ingestas externas permitidas. |

---

## Roadmap de Construcción

```mermaid
gantt
    title Sprint de Construcción — Pop-Up City
    dateFormat YYYY-MM-DD
    axisFormat %d/%m

    section Día 1-2: Fundamentos
    Configurador No-Code (Módulo D)      :d1, 2026-05-11, 2d
    Estructura de datos del Kernel       :d2, 2026-05-11, 1d

    section Día 3-4: Captura
    Pipeline OCR + Audio (Módulo A)      :d3, 2026-05-13, 2d
    Grafo de conocimiento base           :d4, 2026-05-13, 2d

    section Día 5-6: Inteligencia
    Motor de Impacto (Módulo B)          :d5, 2026-05-15, 2d
    Traducción híbrida (Módulo C)        :d6, 2026-05-15, 2d

    section Día 7: Integración
    Integrar los 4 módulos               :d7, 2026-05-17, 1d
    Demo con dataset ficticio            :d8, 2026-05-17, 1d
    Documentación de operador            :d9, 2026-05-17, 1d
```

**Orden de prioridad si el tiempo no alcanza:**

| Prioridad | Módulo | Razón |
|---|---|---|
| 🥇 1° | D — Configuración No-Code | Sin esto, el líder no puede usar nada solo |
| 🥈 2° | A — Captura Offline | Sin datos, no hay inteligencia posible |
| 🥉 3° | B — Análisis de Impacto | El mayor valor diferenciador |
| 4° | C — Traducción | Crítico para inclusión, pero puede empezar básico |

---

## Stack Tecnológico

| Componente | Tecnología | Por qué |
|---|---|---|
| Frontend | HTML/CSS/JS vanilla | Funciona en cualquier navegador viejo |
| Backend | Python 3.11+ (FastAPI) | Ecosistema NLP maduro |
| Base de datos | SQLite | Sin servidor, portable, offline |
| OCR | Tesseract 5 | Gratuito, offline, español soportado |
| Audio | Whisper.cpp (modelo `small`) | Offline, buen español, 466 MB |
| Grafo | NetworkX + SQLite | Ligero, sin infraestructura |
| Vectores | ChromaDB (embedded) | SQLite-based, offline |
| LLM | Configurable (local o API) | Ollama local / OpenAI / Anthropic |
| Traducción | LLM + memoria de traducciones | Híbrido IA + humano |

**Requisitos de hardware:** Laptop con 8 GB RAM. Sin GPU. Sin internet para captura.

---

## Métricas de Éxito del Producto Unificado

| Métrica | Objetivo |
|---|---|
| Tiempo para configurar IAldea desde cero | < 20 min |
| Documentos capturados sin internet | 100% |
| Tiempo de análisis de impacto | < 30 seg |
| Ciudadanos que pueden usar IAldea en su lengua | > 70% |
| Líderes que operan sin ayuda técnica | > 80% |
| Información que sobrevive un cambio de autoridad | 100% |

---

## Para Tu Comunidad Específica

### Configuración sugerida de temas por área

| Área | IAldea PUEDE | IAldea NO PUEDE |
|---|---|---|
| 🌾 Producción | Recordar acuerdos de parcelas, fechas de faena, historial de cosechas | Decidir quién merece tierra |
| 🛡️ Seguridad | Mostrar patrones agregados ("5 incidentes este mes"), recordar protocolos | Acusar personas, compartir nombres de sospechosos |
| 🏗️ Infraestructura | Rastrear avance de obras, comparar cotizaciones, recordar acuerdos | Certificar calidad de construcción (necesita ingeniero) |
| 🏪 Comercio | Informar sobre programas de apoyo, recordar acuerdos de mercado | Fijar precios ni recomendar proveedores |
| ⚡ Energía | Documentar consumos, comparar opciones de proveedor | Diseñar instalaciones eléctricas |
| ⛏️ Minería | Archivar oficios, rastrear concesiones, recordar acuerdos con empresas | Dar opinión legal sobre concesiones |
| 🌊 Desastres | Difundir protocolos de emergencia, recordar zonas de riesgo | Evaluar riesgo estructural de edificios |
| 🔫 Delincuencia | Patrones agregados anónimos, protocolos de seguridad | Acusar, identificar, ni publicar denuncias |
| 📚 Educación | Recordar fechas de inscripción, informar sobre becas (Benito Juárez, etc.), rastrear necesidades de infraestructura escolar, documentar acuerdos del comité de padres | Evaluar calidad educativa, calificar maestros, ni decidir asignación de becas |
| 💼 Empleo | Informar sobre programas de capacitación (STPS, Jóvenes Construyendo), documentar oficios locales, recordar acuerdos de jornaleros con empleadores | Intermediar contrataciones, garantizar salarios, ni dar asesoría legal laboral |
| 🏥 Salud | Recordar calendarios de brigadas médicas y vacunación, informar sobre programas (IMSS-Bienestar), documentar necesidades de la clínica rural, rastrear acuerdos sobre infraestructura de salud | **NUNCA diagnosticar**, recetar medicamentos, dar consejos médicos, ni sustituir a un profesional de salud. Siempre derivar: "Consulte al médico de la clínica" |

---

## Nombre del Producto

> **IAldea Comunidad** — *Tu memoria, tu inteligencia, tu lengua, tus reglas.*

Los 4 módulos en una frase:
- 📸 **Captura** lo que saben → 🔮 **Entiende** lo que impacta → 🌐 **Habla** como tú hablas → 🛡️ **Respeta** lo que tú decides.

---

*Documento generado como consolidación de los planes 01, 08, 13 y 16 de IAldea.*

---

## 📊 Registro de Avances

> Última actualización: **11 de mayo de 2026** — Pop-Up City, Puerto Escondido, Oaxaca
> Commit: `f64ce8b` → [github.com/MarxMad/IAldea-org-26](https://github.com/MarxMad/IAldea-org-26)

---

### Estado General por Módulo

| Módulo | Nombre | Estado | Avance |
|---|---|---|---|
| A | Captura Multimodal Offline | 🟡 En diseño | Plan completo, pendiente código |
| B | Análisis Predictivo de Impacto | 🟢 Iniciado | Script GIS funcional, capas generadas |
| C | Traducción a Lenguas Originarias | 🟡 En diseño | Plan completo, pendiente código |
| D | Configuración No-Code | 🟡 En diseño | Plan completo, pendiente código |
| GIS | Capas geoespaciales del territorio | ✅ Completado | 5 capas derivadas del MDT INEGI |

---

### ✅ Completado

#### Módulo B / GIS — Procesamiento del MDT INEGI (11 mayo 2026)

Script: [`scripts/generar_capas_mdt.py`](scripts/generar_capas_mdt.py)
Fuente: MDT INEGI E14D58D1, resolución 1.5m, Valles Centrales de Oaxaca

**5 capas geoespaciales generadas** del territorio piloto:

| Capa | Archivo | Resultado clave |
|---|---|---|
| Pendientes | `derivados/pendientes.tif` | Media **19.9°** — terreno muy inclinado |
| Orientación solar | `derivados/orientacion.tif` | **24.4%** del área apta para paneles solares |
| Sombreado del relieve | `derivados/sombreado.tif` | Mapa visual 3D del territorio |
| Riesgo de derrumbe | `derivados/riesgo_derrumbe.tif` | **22.6% en riesgo alto/crítico** = ~963 ha |
| Humedad / inundación | `derivados/humedad_twi.tif` | **834 ha** con alta acumulación de agua |

**Clasificación de riesgo real del territorio piloto (Tlacolula, Oaxaca):**

| Nivel | Grados | Área | Implicación para la comunidad |
|---|---|---|---|
| 1 Bajo | 0–8° | 941.9 ha | Zonas seguras para vivienda y construcción |
| 2 Moderado | 8–15° | 702.2 ha | Construir con precaución menor |
| 3 Alto | 15–30° | 1,584.1 ha | Evaluar antes de construir — zona de riesgo |
| 4 Muy alto | 30–45° | 816.2 ha | Riesgo activo de deslizamiento |
| 5 Crítico | >45° | 126.9 ha | No apto para ningún uso humano |

**Uso concreto por área:**

```
🌊 Desastres   → Mapa de riesgo_derrumbe.tif identifica 963 ha en peligro real
⚡ Energía     → orientacion.tif señala laderas sur-suroeste para paneles solares
🏗️ Infraestruc → pendientes.tif para elegir trazos de caminos con menor desnivel
💧 Agua        → humedad_twi.tif delimita cuencas de captación natural
🛡️ Seguridad   → pendientes.tif para ubicar puntos de vigilancia con visibilidad
🌾 Producción  → zonas riesgo=1 (941 ha) son las más aptas para cultivo
```

---

#### Documentación Estratégica (10–11 mayo 2026)

| Documento | Descripción | Líneas |
|---|---|---|
| `docs/planning/ideas_desarrollo.md` | 20 ideas de desarrollo organizadas por capa de arquitectura | 36 |
| `docs/planning/plan_01_ingesta_multimodal.md` | Plan completo: OCR, Whisper.cpp, pipeline offline | ~220 |
| `docs/planning/plan_08_analisis_impacto.md` | Plan completo: grafo de conocimiento, propagación de impacto | ~250 |
| `docs/planning/plan_13_traduccion_lenguas.md` | Plan completo: sistema híbrido IA+humano, lenguas de Oaxaca | ~300 |
| `docs/planning/plan_16_config_nocode.md` | Plan completo: asistente de 7 pasos, generación SOUL.md/YAML | ~350 |
| `docs/planning/plan_producto_unificado.md` | Este documento — visión integrada para 10 áreas de la comunidad | ~450 |
| `metadatos/` | Metadatos INEGI del MDT (3 archivos, documentación oficial) | — |
| `derivados/README.md` | Estadísticas completas del procesamiento MDT | 55 |

---

#### Infraestructura del Repositorio (11 mayo 2026)

```
IAldea-org-26/
├── .gitignore
├── docs/
│   └── planning/
│       ├── ideas_desarrollo.md
│       ├── plan_01_ingesta_multimodal.md   ← Módulo A
│       ├── plan_08_analisis_impacto.md     ← Módulo B
│       ├── plan_13_traduccion_lenguas.md   ← Módulo C
│       ├── plan_16_config_nocode.md        ← Módulo D
│       └── plan_producto_unificado.md       ← Este documento
├── metadatos/
│   ├── e14d58d1_mt.txt
│   ├── e14d58d1_mt.xml
│   └── metadatos_mdt_1.5m.txt
├── scripts/
│   ├── generar_capas_mdt.py
│   └── init_kernel_db.py
└── derivados/
    └── README.md
```

**Repositorio:** [github.com/MarxMad/IAldea-org-26](https://github.com/MarxMad/IAldea-org-26)
**Fork de:** [github.com/ariutokintumi/IAldea-org](https://github.com/ariutokintumi/IAldea-org)

---

### 🔄 En Progreso

#### Datos de entrada disponibles (no en repo por tamaño)

| Dataset | Tamaño | Ubicación local | Estado |
|---|---|---|---|
| MDT INEGI E14D58D1 (BIL) | 72.4 MB | `conjunto_de_datos/` | ✅ Disponible |
| MDT INEGI E14D58D1 (GeoTIFF) | 45.8 MB | `conjunto_de_datos/` | ✅ Disponible |
| Anuario Estadístico Oaxaca 2021 (PDF) | ~15 MB | `resumen_Oaxaca.pdf` | ✅ Analizado, pendiente ingestión al Kernel |
| `pendientes.tif` | 74.8 MB | `derivados/` | ✅ Generado |
| `orientacion.tif` | 74.9 MB | `derivados/` | ✅ Generado |
| `sombreado.tif` | 73.8 MB | `derivados/` | ✅ Generado |
| `riesgo_derrumbe.tif` | 4.6 MB | `derivados/` | ✅ Generado |
| `humedad_twi.tif` | 75.8 MB | `derivados/` | ✅ Generado |

---

### 🔜 Próximos Pasos (ordenados por prioridad)

```mermaid
graph TD
    A["✅ 5 capas GIS<br/>generadas"] --> B["🔜 Visualizador web<br/>mapa interactivo<br/>(Leaflet.js)"]
    A --> C["🔜 Ingestar Anuario<br/>INEGI al Kernel<br/>(PyMuPDF)"]
    B --> D["🔜 Módulo A:<br/>Pipeline de<br/>captura offline"]
    C --> D
    D --> E["🔜 Módulo B:<br/>Motor de impacto<br/>con datos del grafo"]
    E --> F["🔜 Módulo C:<br/>Chat bilingüe<br/>Mixteco/Español"]
    F --> G["🔜 Módulo D:<br/>Configurador<br/>no-code"]
    G --> H["🎯 Demo integrado<br/>con dataset<br/>ficticio de Tlacolula"]

    style A fill:#4A7C59,color:#fff
    style H fill:#1E4D5C,color:#fff
```

| # | Tarea | Módulo | Esfuerzo |
|---|---|---|---|
| 1 | Mapa web interactivo con las 5 capas GIS (Leaflet.js) | B/GIS | ~4 h |
| 2 | Ingestar `resumen_Oaxaca.pdf` al Kernel con PyMuPDF | A | ~2 h |
| 3 | Pipeline OCR básico (Tesseract) para fotos de actas | A | ~1 día |
| 4 | Pipeline de transcripción de audio (Whisper.cpp) | A | ~1 día |
| 5 | Grafo de conocimiento base (NetworkX + SQLite) | B | ~2 días |
| 6 | Motor de análisis de impacto básico | B | ~2 días |
| 7 | Chat bilingüe con LLM + detección de idioma | C | ~2 días |
| 8 | Asistente no-code de configuración (7 pasos) | D | ~2 días |
| 9 | Dataset ficticio de comunidad "San Juan Tlacolula" | Demo | ~1 día |
| 10 | Demo integrado para presentación | Todos | ~1 día |

---

*Registro de avances actualizado el 11 de mayo de 2026 — ETH Cinco de Mayo Pop-Up City.*
