FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY src ./src
COPY entrypoint.sh  /

EXPOSE 3000

CMD [ "npm", "start" ]