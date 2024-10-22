# Usar Node.js para producción
FROM node:22.9.0

WORKDIR /app

# Copiar dependencias y construir la aplicación
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

# Comando para iniciar el backend
CMD ["node", "index.js"]
