# Desarrollo sin tantas terminales
# Uso: make up | make logs-whatsapp | make down

.PHONY: up down logs-whatsapp logs-langgraph ps

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
