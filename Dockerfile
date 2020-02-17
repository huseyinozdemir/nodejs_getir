FROM node:13.8.0-alpine

RUN mkdir /app	
WORKDIR /app

COPY app /app
COPY server.js /app
COPY package.json /app

ENV HOME=/app

RUN apk add --update --no-cache nodejs bash
RUN npm update
RUN npm install
RUN npm install dotenv@8.2.0
RUN npm install -g nodemon
RUN npm install -g jest

USER node
