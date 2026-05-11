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

```mermaid
graph TB
    subgraph "ENTRADA"
        I1["📸 Fotos"]
        I2["🎙️ Audio"]
        I3["📄 PDFs"]
        I4["💬 Chat ciudadano<br/>(bilingüe)"]
        I5["❓ Consulta de<br/>análisis de impacto"]
    end

    subgraph "CAPA 1 — KERNEL"
        K1["Motor OCR<br/>(Tesseract)"]
        K2["Transcriptor<br/>(Whisper.cpp)"]
        K3["Almacén versionado<br/>(SQLite)"]
    end

    subgraph "CAPA 2 — GRAFO"
        G1["Grafo de<br/>conocimiento"]
        G2["Búsqueda<br/>vectorial"]
        G3["Motor de<br/>propagación<br/>de impacto"]
    end

    subgraph "CAPA 3 — AGENTES"
        A1["Agente Ciudadano<br/>(bilingüe)"]
        A2["Agente Autoridad<br/>(análisis)"]
        A3["Motor de<br/>traducción<br/>híbrido"]
    end

    subgraph "CAPA 4 — SEGURIDAD"
        S1["Auditor<br/>(SOUL.md)"]
        S2["Configurador<br/>visual no-code"]
        S3["Simulador<br/>de pruebas"]
    end

    I1 --> K1
    I2 --> K2
    I3 --> K1
    K1 --> K3
    K2 --> K3
    K3 --> G1
    K3 --> G2

    I5 --> A2
    A2 --> G3
    G3 --> G1
    G3 --> G2

    I4 --> A3
    A3 --> A1
    A1 --> G2

    A1 --> S1
    A2 --> S1
    S2 --> S1
    S2 --> S3

    style K3 fill:#E89B3C,color:#1B1A17
    style G1 fill:#1E4D5C,color:#fff
    style A3 fill:#B8482E,color:#fff
    style S2 fill:#4A7C59,color:#fff
```

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
