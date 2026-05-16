FROM node:18-slim
WORKDIR /app
COPY apps/conmutador-service/package*.json ./
RUN npm install
COPY apps/conmutador-service/ .
# Copiar el .env desde la raíz para que el búnker tenga acceso a las llaves
COPY .env ../../.env 
EXPOSE 3005
CMD ["node", "index.js"]
