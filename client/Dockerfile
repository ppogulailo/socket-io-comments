
# Stage 1: build
FROM node:14 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm  run build -prod

EXPOSE 3000
