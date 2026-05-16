# Desarrollo sin tantas terminales
# Uso: make up | make logs-whatsapp | make down

.PHONY: up down logs-whatsapp logs-langgraph ps db-init

up:
	docker compose up -d --build

down:
	docker compose down

logs-whatsapp:
	docker logs -f ialdea-whatsapp

logs-langgraph:
	docker logs -f ialdea-langgraph

ps:
	docker compose ps

# Aplica infra/db/init.sql al Postgres del compose (tabla memberships, extension vector, etc.).
# Úsalo si la base ya existía sin esquema; requiere contenedor ialdea-db en marcha.
db-init:
	docker compose exec -T db psql -U $${DB_USER:-admin} -d $${DB_NAME:-ialdea_db} < infra/db/init.sql
