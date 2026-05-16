FROM node:18-slim
WORKDIR /app

# Necesitamos el núcleo para el orquestador
COPY package.json .
COPY packages ./packages
COPY IaAldea_SOUL.md .

# Gateway
COPY apps/telegram-gateway ./apps/telegram-gateway
WORKDIR /app/apps/telegram-gateway
RUN npm install

CMD ["node", "index.js"]
