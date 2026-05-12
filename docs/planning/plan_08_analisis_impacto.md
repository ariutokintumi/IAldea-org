# 🔮 Plan: Análisis Predictivo de Impacto

> **Capa:** 02 / Graph — Knowledge Graph + Vectors  
> **Prioridad:** Media-Alta  
> **Complejidad estimada:** Alta  
> **Sprint sugerido:** Day 4–6 del Pop-Up City  

---

## 1. Visión General

Antes de que una comunidad tome una decisión, este módulo navega el grafo de conocimiento para revelar **qué otras áreas, proyectos, recursos y acuerdos previos** podrían verse afectados. No predice el futuro ni recomienda — **ilumina conexiones que un humano podría no ver**.

> [!IMPORTANT]
> Este módulo **nunca** recomienda una decisión. Solo muestra las relaciones existentes en la memoria comunitaria para que los humanos decidan con más contexto.

---

## 2. Diagrama de Flujo General

```mermaid
graph TB
    subgraph "🧑‍💼 Entrada del Usuario"
        A["Autoridad o comité<br/>describe una medida<br/>propuesta en lenguaje natural"]
    end

    subgraph "🔍 Motor de Análisis"
        B["NLP: Extracción<br/>de entidades y<br/>conceptos clave"]
        C["Búsqueda en el<br/>Grafo de Conocimiento"]
        D["Búsqueda vectorial<br/>en el Kernel"]
        E["Motor de propagación<br/>de impacto<br/>(graph traversal)"]
    end

    subgraph "📊 Generación del Reporte"
        F["Mapa visual<br/>de impacto"]
        G["Tabla de áreas<br/>afectadas"]
        H["Acuerdos previos<br/>relacionados"]
        I["Riesgos identificados<br/>(con fuentes)"]
    end

    subgraph "✅ Capa de Seguridad"
        J["Auditor verifica<br/>que no haya<br/>recomendaciones implícitas"]
    end

    A --> B
    B --> C
    B --> D
    C --> E
    D --> E
    E --> F
    E --> G
    E --> H
    E --> I
    F --> J
    G --> J
    H --> J
    I --> J
    J --> K["📋 Reporte final<br/>entregado a la autoridad"]

    style A fill:#E89B3C,color:#1B1A17
    style K fill:#1E4D5C,color:#fff
```

---

## 3. Modelo de Entidades del Grafo

El análisis predictivo opera sobre las entidades ya definidas en la arquitectura de IAldea. Aquí se muestra cómo se relacionan para este módulo:

```mermaid
erDiagram
    DECISION_PROPUESTA ||--o{ AREA_IMPACTADA : "afecta"
    DECISION_PROPUESTA ||--o{ ACUERDO_PREVIO : "puede contradecir"
    DECISION_PROPUESTA ||--o{ RECURSO : "requiere"
    DECISION_PROPUESTA ||--o{ PROYECTO : "interfiere con"

    AREA_IMPACTADA ||--o{ PERSONA_ROL : "involucra"
    AREA_IMPACTADA ||--o{ COMITE : "supervisada por"
    
    ACUERDO_PREVIO ||--|| DOCUMENTO : "registrado en"
    ACUERDO_PREVIO ||--o{ PERSONA_ROL : "firmado por"
    
    PROYECTO ||--o{ RECURSO : "consume"
    PROYECTO ||--o{ COMITE : "liderado por"
    PROYECTO ||--o{ RIESGO : "tiene"

    RECURSO }|--|| PRESUPUESTO : "parte de"
```

---

## 4. Algoritmo de Propagación de Impacto

### 4.1 Proceso paso a paso

```mermaid
sequenceDiagram
    actor U as 👤 Autoridad
    participant NLP as 🧠 Extractor NLP
    participant GRAPH as 🔗 Grafo
    participant VEC as 📐 Vectores
    participant ENGINE as ⚙️ Motor de Impacto
    participant AUDIT as 🛡️ Auditor

    U->>NLP: "Queremos reasignar $30,000<br/>del fondo de agua al nuevo<br/>camino vecinal"
    
    NLP->>NLP: Extrae entidades:<br/>• Recurso: $30,000<br/>• Origen: fondo_agua<br/>• Destino: camino_vecinal
    
    NLP->>GRAPH: Busca nodos relacionados<br/>con "fondo_agua"
    GRAPH-->>ENGINE: Nodos conectados:<br/>• Proyecto: red_agua_potable (60%)<br/>• Comité: comité_agua<br/>• Acuerdo: acta_2025_dic (aprobó $45k)
    
    NLP->>VEC: Busca fragmentos similares<br/>a "reasignar fondo de agua"
    VEC-->>ENGINE: Documentos relevantes:<br/>• Reglamento Art. 12 (fondos)<br/>• Minuta Ene 2026 (presupuesto)
    
    ENGINE->>ENGINE: Propagación nivel 1:<br/>fondo_agua → red_agua_potable
    ENGINE->>ENGINE: Propagación nivel 2:<br/>red_agua_potable → proveedor_tubería<br/>red_agua_potable → barrio_norte (beneficiario)
    ENGINE->>ENGINE: Detección de conflictos:<br/>⚠️ Acuerdo Dic 2025 asignó $45k<br/>al mismo fondo
    
    ENGINE->>AUDIT: Envía reporte borrador
    AUDIT->>AUDIT: Verifica que no contenga<br/>recomendación implícita
    AUDIT-->>U: 📋 Reporte de Impacto aprobado
```

### 4.2 Niveles de Propagación

| Nivel | Alcance | Descripción | Ejemplo |
|---|---|---|---|
| **0** | Directo | La entidad mencionada explícitamente | "Fondo de agua" |
| **1** | Primer grado | Entidades directamente conectadas en el grafo | Proyecto de red de agua, Comité de agua |
| **2** | Segundo grado | Conexiones de las conexiones | Proveedor de tubería, Barrio beneficiario |
| **3** | Contextual | Entidades encontradas por similitud vectorial | Reglamentos relacionados, acuerdos históricos |

> [!TIP]
> El MVP debe implementar hasta nivel 2 de propagación. El nivel 3 (contextual) se puede agregar en la fase de pilotos cuando haya más datos reales.

---

## 5. Tipos de Impacto Detectados

| Tipo de Impacto | Icono | Descripción | Fuente de detección |
|---|---|---|---|
| **Contradicción con acuerdo previo** | ⚠️ | La medida contradice algo ya aprobado | Grafo: relación `contradice` |
| **Recurso compartido** | 💰 | El recurso afectado está comprometido en otro proyecto | Grafo: nodo `Recurso` con múltiples aristas |
| **Proyecto en curso afectado** | 🏗️ | Un proyecto activo depende de lo que se modifica | Grafo: relación `depende_de` |
| **Población impactada** | 👥 | Grupos o barrios que se benefician o perjudican | Grafo: relación `beneficiario` |
| **Precedente histórico** | 📜 | Situaciones similares ya ocurrieron antes | Vectores: similitud semántica |
| **Vacío normativo** | ❓ | No existe regulación ni precedente claro | Ausencia de nodos/documentos relacionados |

---

## 6. Formato del Reporte de Impacto

### 6.1 Estructura

```
┌─────────────────────────────────────────────────────────┐
│  🔮 Reporte de Análisis de Impacto                      │
│  Medida: "Reasignar $30,000 del fondo de agua al       │
│           nuevo camino vecinal"                          │
│  Fecha: 14 de junio de 2026                             │
│  Solicitado por: Presidente municipal                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📊 RESUMEN DE IMPACTO                                  │
│  ┌─────────┬──────────┬────────────┬─────────────────┐  │
│  │ Tipo    │ Cantidad │ Severidad  │ Requiere atención│  │
│  ├─────────┼──────────┼────────────┼─────────────────┤  │
│  │ ⚠️ Conflicto│ 1   │ 🔴 Alta    │ Sí              │  │
│  │ 💰 Recurso │ 2    │ 🟡 Media   │ Sí              │  │
│  │ 🏗️ Proyecto│ 1    │ 🟡 Media   │ Sí              │  │
│  │ 👥 Población│ 1   │ 🟡 Media   │ Revisar         │  │
│  │ 📜 Precedente│ 0  │ —          │ —               │  │
│  └─────────┴──────────┴────────────┴─────────────────┘  │
│                                                         │
│  ⚠️ CONFLICTO CON ACUERDO PREVIO                        │
│  ┌─────────────────────────────────────────────────┐    │
│  │ El acta de asamblea del 15 de diciembre de 2025 │    │
│  │ aprobó destinar $45,000 al fondo de agua para   │    │
│  │ el proyecto de red de agua potable.              │    │
│  │                                                 │    │
│  │ 📎 Fuente: acta_2025_dic_15.pdf, página 3       │    │
│  │ ✅ Aprobado por: asamblea general                │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  💰 RECURSOS AFECTADOS                                  │
│  • Fondo de agua: saldo actual $45,000                  │
│    → Reasignación propuesta: $30,000 (67%)              │
│    → Saldo restante: $15,000                            │
│  • Compromiso existente: compra de tubería ($38,000)    │
│    📎 Fuente: cotización_tubería_feb2026.pdf            │
│                                                         │
│  🏗️ PROYECTOS EN CURSO IMPACTADOS                       │
│  • Red de agua potable (avance: 60%)                    │
│    Responsable: Comité de agua                          │
│    → Sin los $30,000 el proyecto se detiene             │
│    📎 Fuente: informe_avance_mayo2026.pdf               │
│                                                         │
│  👥 POBLACIÓN IMPACTADA                                  │
│  • Barrio Norte: 85 familias esperando la conexión      │
│    📎 Fuente: censo_beneficiarios_2025.xlsx             │
│                                                         │
│  ⚠️ Este reporte NO es una recomendación.               │
│  La decisión corresponde a la asamblea comunitaria.     │
│                                                         │
│  [📄 Exportar PDF]  [🔗 Ver en grafo]  [📤 Compartir]  │
└─────────────────────────────────────────────────────────┘
```

---

## 7. Fases de Implementación

```mermaid
gantt
    title Roadmap de Implementación
    dateFormat YYYY-MM-DD
    axisFormat %d/%m

    section Fase 1 — Extracción
    Extractor NLP de entidades         :f1a, 2026-05-14, 2d
    Mapeo de entidades a nodos del grafo :f1b, after f1a, 1d

    section Fase 2 — Propagación
    Traversal de grafo nivel 1-2       :f2a, 2026-05-15, 2d
    Integración con búsqueda vectorial :f2b, after f2a, 1d
    Detección de conflictos            :f2c, after f2a, 1d

    section Fase 3 — Reporte
    Generador de reporte estructurado  :f3a, 2026-05-17, 1d
    Vista de mapa de impacto (UI)      :f3b, after f3a, 1d
    Exportador PDF                     :f3c, after f3b, 1d

    section Fase 4 — Safety
    Filtro de recomendaciones implícitas :f4a, 2026-05-18, 1d
    Tests con dataset ficticio          :f4b, after f4a, 1d
```

---

## 8. Reglas de Seguridad Cívica Específicas

Este módulo es especialmente sensible porque opera cerca de la toma de decisiones. Las siguientes reglas son **inquebrantables**:

| Regla | Implementación técnica |
|---|---|
| Nunca recomendar una opción sobre otra | El Auditor escanea el reporte buscando lenguaje directivo ("debería", "es mejor", "se recomienda") |
| Siempre citar fuentes | Cada afirmación del reporte incluye referencia al documento origen |
| No inventar conexiones | Solo se reportan relaciones que **existen** en el grafo o documentos |
| Marcar incertidumbre | Si la conexión es por similitud vectorial (no explícita), se marca como "posible relación" |
| No mencionar individuos en contextos negativos | Las personas se referencian por rol, no por nombre, en impactos negativos |
| Disclaimer visible | Cada reporte incluye al final: "Este reporte NO es una recomendación" |

> [!WARNING]
> Un reporte de impacto mal diseñado puede convertirse en una herramienta de manipulación política. El Auditor debe verificar que el reporte no favorezca implícitamente ninguna postura.

---

## 9. Ejemplo de Consulta al Grafo

```mermaid
graph LR
    subgraph "Consulta"
        Q["Reasignar $30k<br/>fondo de agua<br/>→ camino vecinal"]
    end

    subgraph "Nivel 0 — Directo"
        N0A["💰 Fondo de agua<br/>Saldo: $45,000"]
        N0B["🛤️ Camino vecinal<br/>Estado: propuesta"]
    end

    subgraph "Nivel 1 — Primer grado"
        N1A["🏗️ Red agua potable<br/>Avance: 60%"]
        N1B["👥 Comité de agua<br/>Resp: Don José"]
        N1C["📜 Acta Dic 2025<br/>Aprobó $45k"]
        N1D["🏗️ Proyecto camino<br/>Presupuesto: $80k"]
    end

    subgraph "Nivel 2 — Segundo grado"
        N2A["🏪 Proveedor tubería<br/>Cotización: $38k"]
        N2B["🏘️ Barrio Norte<br/>85 familias"]
        N2C["👥 Comité de obras<br/>Sin presupuesto"]
    end

    Q --> N0A
    Q --> N0B
    N0A --> N1A
    N0A --> N1B
    N0A --> N1C
    N0B --> N1D
    N1A --> N2A
    N1A --> N2B
    N1D --> N2C

    style Q fill:#E89B3C,color:#1B1A17
    style N1C fill:#B8482E,color:#fff
    style N2B fill:#1E4D5C,color:#fff
```

---

## 10. Dependencias

| Componente | Función | Dependencia interna |
|---|---|---|
| Extractor NLP | Identificar entidades en la consulta | LLM configurado (OpenAI/Anthropic/local) |
| Grafo de conocimiento | Almacenar y navegar relaciones | Capa 02 de IAldea (`packages/graph/`) |
| Búsqueda vectorial | Encontrar documentos similares | Capa 02 de IAldea (`packages/retrieval/`) |
| Auditor | Verificar neutralidad del reporte | Capa 04 de IAldea (`packages/civic-safety/`) |
| Agente de Autoridad | Interfaz de entrada y salida | Capa 03 de IAldea (`packages/agents/`) |

---

## 11. Métricas de Éxito

| Métrica | Objetivo MVP | Objetivo Piloto |
|---|---|---|
| Entidades correctamente extraídas de la consulta | > 75% | > 90% |
| Relaciones relevantes encontradas en grafo | > 60% de las existentes | > 80% |
| Falsos positivos (relaciones irrelevantes) | < 30% | < 15% |
| Tiempo de generación del reporte | < 30 seg | < 15 seg |
| Reportes que pasan el filtro del Auditor sin edición | > 90% | > 95% |
| Conflictos con acuerdos previos detectados correctamente | > 70% | > 90% |

---

*Documento generado como parte del plan de desarrollo de IAldea.*
