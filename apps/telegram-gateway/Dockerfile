FROM node:18-slim
WORKDIR /app

COPY packages ./packages
COPY tests/safety ./tests/safety
COPY docs/governance/IaAldea_SOUL.md ./docs/governance/IaAldea_SOUL.md

COPY apps/telegram-gateway ./apps/telegram-gateway
WORKDIR /app/apps/telegram-gateway
RUN npm install

CMD ["node", "index.js"]
