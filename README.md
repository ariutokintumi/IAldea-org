# 🏛️ IAldea: Herramienta de Memoria Cívica Soberana

IAldea es una infraestructura de inteligencia colectiva diseñada para proteger, organizar y consultar la memoria de comunidades autónomas. Utiliza una arquitectura blindada para garantizar que la información sensible solo sea accesible por los roles autorizados, manteniendo la soberanía de datos en todo momento.

---

## 🛡️ El Conmutador: Guardián de la Soberanía

La pieza central de IAldea es el **Conmutador**, un servicio aislado (Black Box) que actúa como el árbitro supremo entre la inteligencia artificial y los datos de la comunidad.

- **Rol de Árbitro:** Es el único componente con acceso a las llaves maestras de cifrado. Su función es recibir peticiones de los subagentes, validar el nivel de acceso (L1-L3) y entregar la información descifrada solo si se cumplen las reglas de gobernanza.
- **Blindaje de la IA:** El Orquestador (IA) **nunca** ve las llaves de cifrado. Esto previene que una alucinación del modelo o un ataque de inyección de prompts pueda comprometer la privacidad de la asamblea.
- **Llavero Multi-Nivel (Keychain):**
  - **L1 (Comunitario):** Información pública y transparente.
  - **L2 (Estratégico):** Reservado para Secretaría, Tesorería y Comités.
  - **L3 (Privado):** Datos sensibles de seguridad y administración.

---

## 🧠 Red de Inteligencia Multi-Agente

IAldea no es un chat monolítico, es una asamblea de expertos especializados.

### 1. Orquestadores Especializados (Capa de Experiencia)
Cada usuario interactúa con un Orquestador configurado según su rol en la comunidad:
- **Secretaría:** Enfoque en registro y veracidad histórica.
- **Tesorería:** Enfoque en recursos y viabilidad financiera.
- **Coordinación:** Enfoque en procesos y unión de actores.
- **Ciudadano:** Enfoque en participación, ayuda y transparencia.
- **Validador:** Enfoque en auditoría y evidencia.

### 2. Los 10 Subagentes (Expertos de Dominio)
El Orquestador delega consultas a subagentes que dominan áreas específicas:
- **Agua**, **Economía**, **Salud**, **Educación**, **Asambleas**, **Legal**, **Seguridad**, **Transporte**, **Producción**, **Infraestructura**.

---

## 📱 Canales de Acceso (Gateways)

IAldea es accesible a través de múltiples puertas, todas protegidas por el mismo núcleo de seguridad:

1. **WhatsApp Comunitario (Recomendado):** Usa la versión web para despliegues rápidos sin aprobación de Meta. (Ver `apps/whatsapp-web-gateway`).
2. **Telegram:** Integración completa con bots de Telegram. (Ver `apps/telegram-gateway`).
3. **WhatsApp Business:** Para despliegues a gran escala usando la API oficial de Meta.

---

## 📜 Jerarquía de Confianza (Trust Levels)

Implementamos el protocolo de **Source Hierarchy** para validar la verdad:
- **Trust 1-2 (Hechos):** Documentos oficiales y actas de asamblea aprobadas.
- **Trust 3 (Referencial):** Documentos de trabajo o borradores.
- **Trust 4-5 (Señales):** Feedback ciudadano o inferencias de IA (etiquetadas siempre como `[INFERENCIA]`).

*Si hay contradicción entre fuentes, IAldea utiliza mensajes canónicos para alertar sobre la inconsistencia y solicitar revisión humana.*

---

## 🛠️ Stack Tecnológico

- **IA de Razonamiento:** Claude 4.6 Sonnet (Anthropic). El "Cerebro" que maneja la ética, la personalidad y la síntesis final bajo el protocolo SOUL.md.
- **IA de Recuperación:** OpenAI Embeddings. Los "Bibliotecarios" que permiten a los subagentes realizar búsquedas vectoriales ultra-rápidas en el Kernel.
- **Kernel:** PostgreSQL + pgvector (Memoria Vectorial).
- **Seguridad:** AES-256-GCM (Túnel Conmutador). Protección física de los datos.
- **Orquestación:** **LangGraph** (Python + FastAPI) cuando defines `LANGGRAPH_ORCHESTRATOR_URL`; si no, el **Orquestador** clásico en Node (`packages/agents/router.js`).
- **Puente memoria:** `apps/orchestrator-bridge` expone `POST /bundle` (subagentes + Postgres en Node) para que LangGraph no duplique la ingesta.

---

## 🚀 Inicio Rápido

### 1. Configuración Inicial
Copia el archivo `.env.example` a `.env` y configura tus API Keys y las llaves maestras del Búnker (`CONMUTADOR_KEY_LX`).

### 2. Modo Desarrollo (Manual)
Ideal para pruebas rápidas en tu laptop:

```bash
# Terminal 1 — Búnker (obligatorio para memoria cifrada)
cd apps/conmutador-service && node index.js

# Terminal 2 — Puente Node (subagentes + DB; obligatorio para LangGraph)
cd apps/orchestrator-bridge && npm install && node index.js

# Terminal 3 — LangGraph + FastAPI (opcional; si no corre, los gateways usan solo Node)
cd apps/langgraph-orchestrator && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
export REPO_ROOT="$(cd ../.. && pwd)"
export ORCHESTRATOR_BRIDGE_URL=http://127.0.0.1:3011
export LANGGRAPH_ORCHESTRATOR_URL=http://127.0.0.1:8000   # también en .env de los gateways
.venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000

# Terminal 4 — Gateway
cd apps/whatsapp-web-gateway && npm install && node index.js   # Escanear QR
# o: cd apps/telegram-gateway && npm install && node index.js
```

En `.env`: `LANGGRAPH_ORCHESTRATOR_URL=http://127.0.0.1:8000` activa el grafo (pre-check de rechazos + misma recogida de contexto). Sin esa variable, el comportamiento es el **router Node** anterior.

**Docker:** `docker-compose up` incluye `orchestrator-bridge`, `langgraph-orchestrator` y configura el webhook de WhatsApp hacia LangGraph por defecto.

### 3. Modo Soberano (Servidor Físico / VPS)
Para que IAldea funcione **24/7 de forma permanente** en un servidor:
```bash
# 1. Levantar toda la infraestructura en segundo plano
docker-compose up -d --build

# Equivalente (un solo comando desde la raíz del repo)
make up

# 2. Vincular WhatsApp (si aplica) viendo el QR remoto
docker logs -f ialdea-whatsapp
# o: make logs-whatsapp

# 3. Monitorear logs de la IA
docker logs -f ialdea-telegram
```

---

## 🏛️ Gobernanza Digital (SOUL.md)
IAldea actúa bajo el protocolo de identidad definido en `IaAldea_SOUL.md`. Sus respuestas son breves (máx 150 palabras), formales, cívicas y siempre citan fuentes verificables.

---
*IAldea — Fortaleciendo la soberanía comunitaria a través de la memoria.*
