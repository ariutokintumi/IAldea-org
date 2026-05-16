FROM node:18-slim

# Instalar dependencias para Puppeteer (necesarias para WhatsApp Web en Linux)
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Núcleo IAldea (subagentes, seguridad, SOUL, refusals para fallback del router)
COPY packages ./packages
COPY tests/safety ./tests/safety
COPY IaAldea_SOUL.md .

COPY apps/whatsapp-web-gateway ./apps/whatsapp-web-gateway

WORKDIR /app/apps/whatsapp-web-gateway
RUN npm install

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

CMD ["node", "index.js"]
