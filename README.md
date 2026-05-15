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

## 📜 Jerarquía de Confianza (Trust Levels)

Implementamos el protocolo de **Source Hierarchy** para validar la verdad:
- **Trust 1-2 (Hechos):** Documentos oficiales y actas de asamblea aprobadas.
- **Trust 3 (Referencial):** Documentos de trabajo o borradores.
- **Trust 4-5 (Señales):** Feedback ciudadano o inferencias de IA (etiquetadas siempre como `[INFERENCIA]`).

*Si hay contradicción entre fuentes, IAldea utiliza mensajes canónicos para alertar sobre la inconsistencia y solicitar revisión humana.*

---

## 🛠️ Stack Tecnológico

- **IA:** Claude 4.6 Sonnet (Razonamiento) + OpenAI (Embeddings).
- **Kernel:** PostgreSQL + pgvector (Memoria Vectorial).
- **Seguridad:** AES-256-GCM (Túnel Conmutador).
- **Gateways:** Telegram Bot API & WhatsApp Business API.
- **Infraestructura:** Docker & Node.js (Fastify).

---

## 🚀 Inicio Rápido

### 1. Configuración
Copia el archivo `.env.example` a `.env` y configura tus API Keys y el `CONMUTADOR_KEY`.

### 2. Despliegue con Docker
```bash
docker-compose up -d
```

### 3. Encender los Servicios
```bash
# 1. Iniciar el Búnker de Seguridad
cd apps/conmutador-service && node index.js

# 2. Iniciar el Portal (Telegram)
cd apps/telegram-gateway && node index.js
```

---

## 🏛️ Gobernanza Digital (SOUL.md)
IAldea actúa bajo el protocolo de identidad definido en `IaAldea_SOUL.md`. Sus respuestas son breves (máx 150 palabras), formales, cívicas y siempre citan fuentes verificables.

---
*IAldea — Fortaleciendo la soberanía comunitaria a través de la memoria.*
