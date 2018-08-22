FROM node:latest 

RUN mkdir -p /usr/src/ping-pong-docker/bot  

WORKDIR /usr/src/ping-pong-docker/bot

COPY package.json /usr/src/ping-pong-docker/bot

COPY package-lock.json /usr/src/ping-pong-docker/bot

RUN npm install

COPY . /usr/src/ping-pong-docker/bot