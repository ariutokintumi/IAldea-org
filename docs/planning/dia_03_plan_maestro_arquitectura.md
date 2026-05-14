# Día 3 — Plan Maestro de Arquitectura (IAldea)

Este documento consolida la visión completa de la arquitectura de IAldea: desde la orquestación de agentes hasta la infraestructura de memoria y confianza en blockchain.

---

## 1. Resumen y Principios de Diseño

IAldea es un sistema de memoria cívica basado en **5 Capas** que garantiza soberanía, privacidad y veracidad.

| Capa | Nombre | Función |
|---|---|---|
| **04** | Safety | Auditoría y filtros de salida basados en `SOUL.md`. |
| **03** | Agents | Orquestadores dedicados por rol + Conmutador cifrado. |
| **02** | Graph/Vectors | Índice semántico y relaciones de conocimiento (Postgres + pgvector). |
| **01** | Kernel | Almacén de documentos comunitarios (Postgres). |
| **00** | Trust | Verificación on-chain de integridad y firmas (eVVM). |

### Principios
- **Privacidad Total:** Los números de teléfono se hashean (`channel_ref_hash`).
- **Soberanía:** La comunidad es dueña de su base de datos.
- **Veracidad:** Cada respuesta debe citar una fuente verificada.

---

## 2. Capa 03: Orquestación y Canal WhatsApp

### El Conmutador y el Router de Rol
- **Auth primero:** El nivel de acceso se resuelve en Node.js antes de tocar cualquier LLM.
- **Router:** Deriva el mensaje al orquestador específico según el rol del usuario (`orc_ciudadano`, `orc_secretaria`, etc.).
- **Conmutador:** Túnel cifrado AES-256-GCM que protege el tráfico entre el orquestador y los workers de los subagentes.

```mermaid
flowchart TD
    A([👤 Usuario]) -->|WA| B[Check Access\nNode.js]
    B --> C{Router de Rol}
    C --> ORC[Orquestadores Dedicados\nSonnet 3.5]
    ORC --> SW[Conmutador\nEncrypt/Decrypt]
    SW --> SUB[Subagentes\nWorkers]
```

---

## 3. Capas 02/01: Arquitectura de Memoria (Kernel, Grafo, Vectores)

### Kernel y Persistencia
- **Stack:** Postgres 16 con extensión `pgvector`.
- **Pipeline de Ingesta:** 
    1. Parse (PDF/Docx)
    2. Hash (SHA-256)
    3. Classify (Public/Confidencial/Private)
    4. Chunk (512 tokens)
    5. Index (Vector + Graph)

### Grafo de Conocimiento (Postgres Relational)
Modelamos la comunidad mediante una tabla de `edges` que conecta entidades como:
- `Person` -> `belongs_to` -> `Community`
- `Document` -> `validates` -> `Agreement`
- `Committee` -> `reviews` -> `Proposal`

---

## 4. Capa 00: Trust Layer (eVVM Integration)

Utilizamos **eVVM** (Virtual Blockchain) para asegurar la integridad de la memoria.
- **Identidad:** Soporte nativo para usar teléfonos como IDs.
- **Inmutabilidad:** Los hashes de cada documento se anclan en la cadena.
- **Verificación:** Antes de responder, el sistema valida que el hash local coincide con el registro en eVVM.

---

## 5. Hoja de Ruta: Fases de Implementación Técnica

### Fase 1: Infraestructura (El Kernel)
- [ ] Sub-fase 1.1: Docker Setup (Postgres + pgvector).
- [ ] Sub-fase 1.2: SQL Schema (Memberships, Docs, Anchors, Edges).
- [ ] Sub-fase 1.3: Conexión Node.js.

### Fase 2: Pipeline de Ingesta
- [ ] Parser de documentos y clasificador de sensibilidad.
- [ ] Generación de embeddings y almacenamiento vectorial.

### Fase 3: Integración eVVM
- [ ] Script de anclaje de hashes en Virtual Blockchain.
- [ ] Lógica de verificación de integridad en consulta.

### Fase 4: Motor RAG y Agentes
- [ ] Implementación de búsqueda híbrida (Semántica + Grafo).
- [ ] Creación de orquestadores con Claude 3.5 Sonnet.

---

*Documento consolidado — Día 3. Reemplaza a todos los planes previos de este día.*
