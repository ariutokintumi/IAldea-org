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

# Copiar el núcleo de IAldea (necesario para el Orquestador y Subagentes)
COPY package.json .
COPY packages ./packages
COPY IaAldea_SOUL.md .

# Copiar el código del gateway
COPY apps/whatsapp-web-gateway ./apps/whatsapp-web-gateway

WORKDIR /app/apps/whatsapp-web-gateway
RUN npm install

# Usar el Chromium instalado por el sistema
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

CMD ["node", "index.js"]
