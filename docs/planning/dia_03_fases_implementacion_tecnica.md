# Fase 3 — Implementación Técnica de Memoria y Kernel

Este documento detalla el paso a paso para construir la arquitectura de memoria definida en el Día 3.

---

## 🏗️ Fase 1: Infraestructura y Persistencia (El Kernel)

Esta fase establece el cimiento de datos donde vivirá la memoria de la comunidad.

### Sub-fase 1.1: Entorno de Contenedores (Docker)
- **Imagen:** `ankane/pgvector` (Postgres 16 + pgvector).
- **Puerto:** `5432`.
- **Persistencia:** Volumen local `./data/postgres` para asegurar la soberanía de los datos.

### Sub-fase 1.2: Esquema de Datos Vitales (DDL)
Implementación del esquema relacional en Postgres:
- `memberships`: Control de acceso por hash de teléfono y nivel (L0-L3).
- `documents`: Metadatos de archivos del Kernel.
- `document_versions`: Trazabilidad de cambios y hashes de contenido.
- `blockchain_anchors`: Registro de firmas e integridad en **eVVM**.
- `graph_edges`: Tabla relacional para modelar el Grafo de Conocimiento.

### Sub-fase 1.3: Capa de Conectividad
- Configuración de variables de entorno (`.env`).
- Inicialización de cliente `pg` en Node.js.

---

## 📥 Fase 2: Pipeline de Ingesta (Parsing & Indexing)

Cómo los documentos se convierten en memoria consultable.

1. **Parser:** Extracción de texto y metadatos (quién subió, cuándo, nivel de privacidad).
2. **Chunker:** División de texto en fragmentos (512 tokens) con overlap para mantener contexto.
3. **Embedder:** Generación de vectores usando OpenAI (MVP) con capacidad de switch a Local.
4. **Graph Sync:** Identificación de entidades y creación de relaciones en la DB.

---

## ⛓️ Fase 3: Trust Layer (eVVM Integration)

Integración de la Virtual Blockchain para la inmutabilidad.

- **Hashing:** Generación de SHA-256 de cada versión de documento.
- **Anchoring:** Registro del hash + contributor_handle en eVVM.
- **Verification:** Tool de auditoría para asegurar que el documento recuperado coincide con el registro on-chain.

---

## 🧠 Fase 4: Motor de Consulta (RAG Engine)

La lógica que alimenta a Sonnet con información verificada.

- **Search:** Búsqueda combinada (Semántica en vectores + Relacional en grafo).
- **Role Filter:** Filtrado estricto en la consulta SQL según el `access_level` del usuario.
- **Citation Engine:** Estructuración de la respuesta para incluir siempre la URI y el estado de verificación de eVVM.

---

## Checklist de Salida (Día 3 Implementación)

- [ ] `docker-compose.yml` funcional.
- [ ] DB Schema aplicado y verificado.
- [ ] Conexión desde Node.js exitosa.
- [ ] Primer anclaje de prueba en eVVM (simulado o testnet).
