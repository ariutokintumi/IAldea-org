FROM node:18-slim

# Misma disposición que en monorepo: /app/apps/conmutador-service + /app/packages/...
# index.js usa ../../packages/security/keychain
WORKDIR /app
COPY packages/security /app/packages/security

WORKDIR /app/apps/conmutador-service
COPY apps/conmutador-service/package*.json ./
RUN npm install
COPY apps/conmutador-service/ ./

# Llaves CONMUTADOR_KEY_* vía env_file / environment en docker-compose (no copiar .env a la imagen).
EXPOSE 3005

CMD ["node", "index.js"]
