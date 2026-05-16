FROM node:18-slim

WORKDIR /app

COPY packages ./packages
COPY tests/safety ./tests/safety
COPY docs/governance/IaAldea_SOUL.md ./docs/governance/IaAldea_SOUL.md

COPY apps/orchestrator-bridge ./apps/orchestrator-bridge

WORKDIR /app/apps/orchestrator-bridge
RUN npm install

EXPOSE 3011

CMD ["node", "index.js"]
