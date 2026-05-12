# 📦 Plan: Módulo de Ingesta Multimodal Offline

> **Capa:** 01 / Kernel — Community Memory Kernel  
> **Prioridad:** Alta  
> **Complejidad estimada:** Media-Alta  
> **Sprint sugerido:** Day 3–5 del Pop-Up City  

---

## 1. Visión General

Permitir que comunidades con conectividad limitada o nula digitalicen su memoria histórica (actas en papel, grabaciones de asambleas, fotografías de documentos) y la indexen en el Kernel de IAldea de forma completamente local.

> [!IMPORTANT]
> Este módulo es la puerta de entrada para comunidades rurales. Sin él, IAldea solo funciona para quienes ya tienen documentos digitales.

---

## 2. Diagrama de Arquitectura

```mermaid
graph TB
    subgraph "📱 Entrada del Usuario"
        A["📄 Foto de acta<br/>(JPG/PNG)"]
        B["🎙️ Audio de asamblea<br/>(MP3/WAV/OGG)"]
        C["📑 PDF escaneado"]
        D["✍️ Texto manual"]
    end

    subgraph "⚙️ Pipeline de Procesamiento Local"
        E["🔍 OCR Engine<br/>(Tesseract 5)"]
        F["🎧 Transcriptor<br/>(Whisper.cpp)"]
        G["📖 Extractor PDF<br/>(pdf.js / PyMuPDF)"]
        H["✅ Validador<br/>de calidad"]
    end

    subgraph "🧹 Post-procesamiento"
        I["Limpieza de texto<br/>+ corrección ortográfica"]
        J["Extracción de metadatos<br/>(fecha, tipo, participantes)"]
        K["Fragmentación<br/>(chunking semántico)"]
    end

    subgraph "💾 Kernel de IAldea"
        L["📂 Almacén de<br/>documentos versionados"]
        M["🔗 Cola de sincronización<br/>(cuando haya red)"]
    end

    A --> E
    C --> G
    B --> F
    D --> I
    E --> H
    F --> H
    G --> H
    H --> I
    I --> J
    J --> K
    K --> L
    L --> M
```

---

## 3. Tipos de Entrada Soportados

| Tipo de archivo | Formatos | Motor de procesamiento | Peso típico | Tiempo estimado* |
|---|---|---|---|---|
| 📄 Imagen de documento | JPG, PNG, TIFF, HEIC | Tesseract 5 + preprocesador | 2–8 MB | 3–10 seg |
| 🎙️ Audio de asamblea | MP3, WAV, OGG, M4A | Whisper.cpp (modelo `small`) | 10–200 MB | 1–15 min |
| 📑 PDF escaneado | PDF (imagen) | Tesseract 5 vía PyMuPDF | 1–50 MB | 5–30 seg |
| 📑 PDF digital | PDF (texto) | PyMuPDF / pdf.js | 0.1–10 MB | <1 seg |
| ✍️ Texto libre | TXT, MD | Directo | <1 MB | Instantáneo |

> \* En hardware de referencia: laptop con CPU i5 de 4 núcleos, 8 GB RAM, sin GPU.

---

## 4. Flujo de Usuario

```mermaid
sequenceDiagram
    actor U as 👤 Operador Cívico
    participant APP as 📱 App Local
    participant PIPE as ⚙️ Pipeline
    participant KERN as 💾 Kernel
    participant SYNC as ☁️ Sync (opcional)

    U->>APP: Selecciona archivos<br/>(fotos, audios, PDFs)
    APP->>APP: Detecta tipo de archivo
    APP->>U: Muestra preview +<br/>pide metadatos básicos
    U->>APP: Confirma tipo de documento,<br/>fecha, descripción
    APP->>PIPE: Envía a procesamiento local

    alt Imagen / PDF escaneado
        PIPE->>PIPE: Pre-procesamiento de imagen<br/>(contraste, rotación, recorte)
        PIPE->>PIPE: OCR con Tesseract 5
    else Audio
        PIPE->>PIPE: Transcripción con Whisper.cpp
        PIPE->>PIPE: Detección de hablantes (opcional)
    else PDF digital
        PIPE->>PIPE: Extracción directa de texto
    end

    PIPE->>PIPE: Validación de calidad<br/>(% de confianza)
    PIPE->>U: Muestra resultado para revisión

    alt Calidad aceptable (>70%)
        U->>APP: Aprueba o corrige texto
    else Calidad baja (<70%)
        PIPE->>U: ⚠️ Sugiere re-escanear<br/>o transcribir manual
        U->>APP: Corrige manualmente
    end

    APP->>KERN: Almacena documento<br/>+ metadatos + fragmentos
    KERN->>KERN: Versiona y marca timestamp

    opt Conexión a internet disponible
        KERN->>SYNC: Sincroniza con<br/>instancia remota
    end
```

---

## 5. Estructura de Datos del Documento Ingestado

```yaml
# Ejemplo de documento procesado en el Kernel
document:
  id: "doc_2026_0614_acta_asamblea"
  type: "acta_asamblea"                  # Tipos: acta_asamblea, reglamento, minuta, oficio, audio_asamblea, foto_historica
  source_format: "image/jpeg"
  original_file: "IMG_20260614_asamblea.jpg"
  
  metadata:
    title: "Acta de asamblea ordinaria - Junio 2026"
    date_document: "2026-06-14"
    date_ingested: "2026-06-15T10:23:00-06:00"
    ingested_by: "operador_maria"
    community_id: "san_juan_mixtepec"
    tags: ["asamblea", "agua_potable", "comité_obras"]
    language: "es"
    custom_labels:                       # Plantillas de metadatos contextuales
      tipo_reunion: "ordinaria"
      barrio: "centro"
  
  processing:
    engine: "tesseract_5"
    confidence_score: 0.87               # 0.0 a 1.0
    human_reviewed: true
    reviewed_by: "operador_maria"
    review_date: "2026-06-15T10:45:00-06:00"
  
  content:
    raw_text: "..."                      # Texto completo extraído
    chunks:                              # Fragmentos para búsqueda vectorial
      - id: "chunk_001"
        text: "Se aprobó por unanimidad destinar $45,000 del fondo comunitario..."
        embedding_status: "pending"      # pending | indexed | error
      - id: "chunk_002"
        text: "El comité de agua reportó avance del 60% en la red..."
        embedding_status: "pending"
  
  versioning:
    version: 1
    changelog: []
    
  sync:
    status: "pending"                    # pending | synced | local_only
    last_sync: null
```

---

## 6. Componentes Técnicos

### 6.1 Pre-procesamiento de Imágenes

```mermaid
graph LR
    A["Imagen<br/>original"] --> B["Escala de<br/>grises"]
    B --> C["Corrección<br/>de rotación<br/>(deskew)"]
    C --> D["Ajuste de<br/>contraste<br/>(CLAHE)"]
    D --> E["Binarización<br/>adaptativa"]
    E --> F["Eliminación<br/>de ruido"]
    F --> G["Imagen lista<br/>para OCR"]

    style A fill:#E89B3C,color:#1B1A17
    style G fill:#1E4D5C,color:#fff
```

**Librería sugerida:** OpenCV (Python) o Sharp (Node.js)

### 6.2 Configuración de Whisper.cpp

| Modelo | Tamaño en disco | RAM requerida | Velocidad (1 min audio) | Precisión español |
|---|---|---|---|---|
| `tiny` | 75 MB | ~400 MB | ~5 seg | ⭐⭐ |
| `base` | 142 MB | ~500 MB | ~10 seg | ⭐⭐⭐ |
| `small` | 466 MB | ~1 GB | ~30 seg | ⭐⭐⭐⭐ |
| `medium` | 1.5 GB | ~2.5 GB | ~2 min | ⭐⭐⭐⭐⭐ |

> [!TIP]
> **Recomendación:** Usar el modelo `small` como default. Ofrece el mejor balance entre precisión en español y rendimiento en hardware modesto. Permitir al operador elegir `tiny` si el hardware es muy limitado.

### 6.3 Umbrales de Calidad

| Nivel | Score OCR/STT | Acción |
|---|---|---|
| 🟢 Alto | ≥ 85% | Indexar automáticamente, mostrar para revisión opcional |
| 🟡 Medio | 70–84% | Indexar pero marcar como "revisión sugerida" |
| 🟠 Bajo | 50–69% | Requiere corrección humana antes de indexar |
| 🔴 Ilegible | < 50% | Rechazar, sugerir re-escaneo o transcripción manual |

---

## 7. Fases de Implementación

```mermaid
gantt
    title Roadmap de Implementación
    dateFormat YYYY-MM-DD
    axisFormat %d/%m

    section Fase 1 — Fundamentos
    Estructura de datos del documento     :f1a, 2026-05-13, 1d
    Ingesta de texto plano y PDF digital  :f1b, after f1a, 1d
    Almacenamiento versionado en Kernel   :f1c, after f1a, 1d

    section Fase 2 — OCR
    Pipeline de pre-procesamiento imagen  :f2a, 2026-05-14, 1d
    Integración Tesseract 5               :f2b, after f2a, 1d
    UI de revisión y corrección           :f2c, after f2b, 1d

    section Fase 3 — Audio
    Integración Whisper.cpp               :f3a, 2026-05-15, 2d
    Segmentación por hablante (básica)    :f3b, after f3a, 1d

    section Fase 4 — Sync & Polish
    Cola de sincronización offline/online :f4a, 2026-05-17, 1d
    Tests de integración                  :f4b, after f4a, 1d
    Documentación de operador             :f4c, after f4b, 1d
```

---

## 8. Requisitos de Hardware Mínimo

| Componente | Mínimo | Recomendado |
|---|---|---|
| CPU | 2 núcleos, 1.5 GHz | 4 núcleos, 2.5 GHz |
| RAM | 4 GB | 8 GB |
| Almacenamiento | 2 GB libres | 10 GB libres |
| GPU | No requerida | Opcional (acelera Whisper) |
| OS | Linux, macOS, Windows | Linux (Raspberry Pi 4+ viable) |
| Red | **No requerida** para ingesta | Necesaria solo para sync remoto |

---

## 9. Dependencias

| Paquete | Función | Licencia | Peso |
|---|---|---|---|
| Tesseract 5 | OCR | Apache 2.0 | ~30 MB + datos de idioma |
| `tesseract-lang-spa` | Datos de español para OCR | Apache 2.0 | ~15 MB |
| Whisper.cpp | Transcripción de audio | MIT | 75 MB–1.5 GB (según modelo) |
| OpenCV / Sharp | Pre-procesamiento de imagen | Apache 2.0 / Apache 2.0 | ~50 MB |
| PyMuPDF / pdf.js | Extracción de PDF | AGPL / Apache 2.0 | ~10 MB |
| SQLite | Almacenamiento local | Public domain | Incluido |

---

## 10. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| OCR de baja calidad en documentos viejos/maltratados | Alta | Medio | UI de corrección manual + flag de calidad |
| Whisper impreciso en acentos regionales | Media | Alto | Permitir corrección humana + fine-tuning futuro |
| Hardware insuficiente en comunidades | Media | Alto | Modelo `tiny` como fallback, procesamiento por lotes |
| Archivos muy grandes saturan la memoria | Baja | Medio | Procesamiento en streaming, límites configurables |
| Privacidad: audios con datos sensibles | Media | Alto | Procesamiento 100% local, nunca enviar audio a APIs externas |

> [!CAUTION]
> Los audios de asambleas pueden contener información sensible (nombres, conflictos, votos). El procesamiento **debe** ser completamente local. Nunca enviar audio a servicios en la nube sin consentimiento explícito documentado.

---

## 11. Métricas de Éxito

| Métrica | Objetivo MVP | Objetivo Piloto |
|---|---|---|
| Tiempo de ingesta por documento (imagen) | < 15 seg | < 10 seg |
| Precisión OCR en documentos limpios | > 80% | > 90% |
| Precisión transcripción de audio (español) | > 70% | > 85% |
| % de documentos que requieren corrección humana | < 40% | < 20% |
| Documentos ingestados sin conexión | 100% | 100% |

---

## 12. Interfaz de Usuario (Wireframe Conceptual)

```
┌─────────────────────────────────────────────────────────┐
│  📦 Ingesta de Documentos                    [Ayuda ?]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │        📁  Arrastra archivos aquí               │    │
│  │            o haz clic para seleccionar           │    │
│  │                                                 │    │
│  │   Formatos: JPG, PNG, PDF, MP3, WAV, TXT        │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ── Archivos seleccionados ──────────────────────────   │
│                                                         │
│  📄 IMG_asamblea_junio.jpg          2.3 MB    [🗑️]     │
│     Tipo: [Acta de asamblea ▾]                          │
│     Fecha del documento: [14/06/2026]                   │
│     Descripción: [Asamblea ordinaria - agua potable]    │
│                                                         │
│  🎙️ grabacion_asamblea.mp3         45.2 MB    [🗑️]     │
│     Tipo: [Audio de asamblea ▾]                         │
│     Fecha del documento: [14/06/2026]                   │
│     Descripción: [Grabación completa de la reunión]     │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  ⚙️ Opciones de procesamiento                   │    │
│  │  Modelo de audio: [small (recomendado) ▾]       │    │
│  │  Idioma: [Español ▾]                            │    │
│  │  □ Intentar separar hablantes                   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│            [ ⬆️ Procesar e Ingresar al Kernel ]         │
│                                                         │
│  Estado: 🟢 Sin conexión — los documentos se            │
│          almacenarán localmente                         │
└─────────────────────────────────────────────────────────┘
```

---

*Documento generado como parte del plan de desarrollo de IAldea.*
