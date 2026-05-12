# Arquitectura IAldea — guía operativa

> Cuatro capas: **Kernel → Graph → Agents → Safety**. Detalle abajo para la capa **Graph** (la que más confunde) y para **quién es el agente principal, quién filtra y qué roles** existen.  
> Marco canónico: [README.md](../README.md) § Architecture · diagrama unificado: [planning/plan_producto_unificado.md](planning/plan_producto_unificado.md) (mermaid “Arquitectura Unificada”).

---

## 1. Qué guarda cada capa (mental model)

| Capa | Pregunta que responde | Analogía breve |
|------|----------------------|----------------|
| **01 Kernel** | “¿Qué texto crudo tenemos y de dónde viene?” | Archivero versionado: PDFs/actas transcritos → fragmentos (`chunks`) en SQLite. |
| **02 Graph** | “¿Cómo se **relacionan** las cosas y qué fragmentos **parecen** relevantes por significado?” | Mapa de nodos y aristas + buscador semántico. |
| **03 Agents** | “¿Qué **dice** el sistema al usuario, con qué rol y con qué fuentes?” | Dos conversadores (ciudadano / autoridad) + puente de idioma. |
| **04 Safety** | “¿Esa respuesta **puede salir** sin violar SOUL/policy?” | Auditor + configurador + simulador. |

El Kernel **no** “entiende” relaciones; solo persiste y versiona. El Graph **no** inventa texto; cruza entidades y recupera pasajes para los agentes.

---

## 2. Capa Graph — las tres cajas del diagrama

### 2.1 Grafo de conocimiento (estructura explícita)

- **Qué es:** nodos tipados (Persona, Rol, Comité, Acuerdo, Documento, Proyecto, Recurso, Riesgo, …) y **aristas** con significado (`AFECTA`, `REGISTRADO_EN`, `CONSUME`, `APROBÓ`, …).
- **Para qué:** preguntas del tipo “si toco **X**, qué **Y** del grafo está a N saltos?” — trazabilidad de acuerdos y dependencias.
- **No es:** una base de texto libre; lo que no esté modelado como nodo/arista no se recorre bien.

### 2.2 Búsqueda vectorial (significado / RAG)

- **Qué es:** embeddings de fragmentos del Kernel; consulta por **similitud** (“por significado”, no solo palabra clave).
- **Para qué:** encontrar párrafos de actas o oficios relevantes aunque el usuario use otras palabras; alimentar citas del agente.
- **No es:** el grafo relacional; convive con él (híbrido: grafo + vectores).

### 2.3 Motor de propagación de impacto (algoritmo sobre el grafo)

- **Qué es:** a partir de una **decisión o consulta** (a menudo extraída por NLP desde lenguaje natural), recorre el grafo (BFS/DFS con límites de profundidad y pesos) y opcionalmente cruza con resultados vectoriales.
- **Para qué:** armar el “mapa de impacto”: qué proyectos, fondos o acuerdos **aparecen conectados** en la memoria documentada.
- **No hace:** recomendar la decisión correcta (véase [plan_08_analisis_impacto.md](planning/plan_08_analisis_impacto.md): solo ilumina conexiones).

**Flujo típico:** Kernel alimenta texto → (extracción) crea o enlaza nodos → Graph sirve al **Agente Autoridad** para impacto y al **Agente Ciudadano** para RAG → **Auditor** revisa la salida.

---

## 3. Herramientas recomendadas (alineadas al plan unificado)

| Pieza | Herramienta sugerida | Por qué encaja |
|-------|---------------------|----------------|
| Almacén + trazas | **SQLite** (ya en Kernel) | Offline, portable, un archivo por comunidad. |
| Grafo en memoria / algoritmos | **NetworkX** (Python) | Ligero, sin Neo4j; serialización a tablas SQLite si hace falta. |
| Vectores embebidos | **Chroma** en modo embedded / SQLite-backed | Sin servidor; encaja con “laptop 8 GB, sin GPU obligatoria”. |
| API orquestación | **FastAPI** (cuando exista `apps/api`) | Ecosistema NLP, async, fácil de desplegar detrás de nginx o local. |
| OCR / audio | **Tesseract**, **Whisper.cpp** | Offline según [plan_01_ingesta_multimodal.md](planning/plan_01_ingesta_multimodal.md). |
| LLM | **Ollama / API** configurable | Política por comunidad en `policy_config.yaml`. |

**Alternativas** (si el equipo crece): Neo4j o Kuzu para grafo persistente más rico; Qdrant embedded; siguiendo siempre la restricción **offline-first** del README/planes.

---

## 4. Agentes: principal, filtro y roles

### 4.1 Dos agentes conversacionales principales (Capa 03)

Ambos comparten memoria (Kernel + Graph) pero **políticas distintas** (`policy_config.yaml` + tono en `SOUL.md`).

| Agente | Rol principal | Usuario típico |
|--------|----------------|----------------|
| **Agente Ciudadano** | Responder dudas con **citas**, explicar trámites/acuerdos públicos, recoger feedback según modo de privacidad. Bilingüe cuando aplique. | `ciudadano`, `financiador` (perfil restringido). |
| **Agente Gobernanza** (antes “Autoridad / comité”) | Preparar asambleas, **comparar 2–3 escenarios** no críticos, resumir preocupaciones agregadas, borradores con fuentes, **consultas de análisis de impacto** cuando exista grafo. | `secretaria`, `coordinacion`, `comite_miembro`, `tesoreria`, `validador` (mismo tubería, `system`/tools por `role_slug`). |

Tubería concreta (contexto → puerta previa → generador por rol → auditor): ver [`packages/agents/README.md`](../packages/agents/README.md) y contratos [`citizen.md`](../packages/agents/citizen.md) / [`authority.md`](../packages/agents/authority.md).

Ninguno de los dos “gobierna”: ambos **rechazan** temas fuera de alcance y deben citar fuentes.

### 4.2 Motor de traducción híbrido (Capa 03, bloque rojo en el diagrama)

- **No es un segundo “agente de decisión”.** Es **pre/post-procesamiento de idioma**: detectar lengua, traducir entrada/salida, bajar a memoria de frases validadas por humanos cuando la confianza es baja ([plan_13_traduccion_lenguas.md](planning/plan_13_traduccion_lenguas.md)).
- **Orden en el chat ciudadano:** entrada → **traducción** (si aplica) → **Agente Ciudadano** → salida → **traducción** (si aplica) → **Auditor** (ver abajo).

### 4.3 Quién “filtra” de verdad (Capa 04 — Safety)

| Componente | Función |
|--------------|---------|
| **Auditor (SOUL.md + policy)** | **Filtro final obligatorio** sobre **toda** respuesta que vaya a usuario: legal/médico/electoral fuera de alcance, acusaciones, fugas de privacidad, alucinaciones, citas faltantes, ambigüedad peligrosa. |
| **Clasificador ligero** (opcional, previo al LLM) | Filtro **rápido** de intents prohibidos (rumor, voto, diagnóstico); educa y corta sin gastar tokens — idea en [ideas_desarrollo.md](planning/ideas_desarrollo.md) / plan 16. |
| **Configurador no-code** | No filtra mensajes en runtime; **define** reglas que el Auditor aplica. |
| **Simulador** | No filtra tráfico; **prueba** que reglas + Auditor se comportan como la comunidad espera. |

**Resumen en una frase:** el **Agente Ciudadano o Autoridad** “piensa y redacta”; el **motor de traducción** “adapta idioma”; el **Auditor** “permite o bloquea la salida” según SOUL/policy.

---

## 5. Relación con GIS / capas territoriales

Los raster (MDT, pendientes, riesgo, etc.) pueden ser **nodos de tipo `PublicSource` o `Layer`** enlazados a `Location` en el grafo y citados como cualquier otro documento. El motor de impacto puede **incorporar** esas relaciones si están modeladas; no sustituyen al grafo de acuerdos internos.

---

## 6. Paquetes en este monorepo (objetivo)

| Carpeta | Responsabilidad |
|---------|-----------------|
| `packages/memory-kernel/` | SQLite, documentos, chunks, versiones, auditoría de eventos. |
| `packages/graph/` | Modelo de nodos/aristas, propagación, export/import. |
| `packages/retrieval/` | BM25 + vector store + fusión híbrida. |
| `packages/agents/` | Orquestación por rol: ensamblador de contexto, generador (ciudadano / gobernanza / operador), contratos en `citizen.md` y `authority.md`. |
| `packages/civic-safety/` | Auditor, clasificadores, simulador. |
| `packages/connectors/` | INEGI, ingestas, etc. |

---

*Última revisión: alineado con README canónico y planes 01, 08, 13, 16 del fork.*
