FROM node:12.21-alpine3.12 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
ENV PORT=8080
EXPOSE 8081
ENV NODE_ENV=prod
CMD ["npm", "run", "start:dev"]