FROM node:latest

RUN mkdir -p /usr/src/ping-pong-docker/api  

RUN mkdir -p /usr/src/ping-pong-docker/bot  

WORKDIR /usr/src/ping-pong-docker

COPY package.json /usr/src/ping-pong-docker

COPY package-lock.json /usr/src/ping-pong-docker

RUN npm install

RUN npm install pm2 -g

COPY . /usr/src/ping-pong-docker

EXPOSE 3000

CMD ["pm2-docker", "start", "pm2.json"]