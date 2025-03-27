# Etapa 1: Imagem base do Python
FROM node:23-alpine3.20

WORKDIR /frontend

COPY . .

RUN yarn install

EXPOSE 3000

CMD ["npm", "start"]


