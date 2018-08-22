FROM node:latest

RUN mkdir -p /usr/src/ping-pong-docker/api  

WORKDIR /usr/src/ping-pong-docker/api

COPY package.json /usr/src/ping-pong-docker/api

COPY package-lock.json /usr/src/ping-pong-docker/api

RUN npm install

RUN npm install pm2 -g

COPY . /usr/src/ping-pong-docker/api

EXPOSE 3000

CMD ["pm2-docker", "start", "pm2.json"]