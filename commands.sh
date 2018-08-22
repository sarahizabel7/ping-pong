#!/bin/bash

command=$1
mag=$'\e[1;35m'
end=$'\033[0;39m'

case $command in
	start)
	echo "${mag}Building docker images and uping containers...${end}"
	docker-compose up -d --build &&
	docker exec -it pingpong_bot_1 bash -c "node bot.js"
	;;
	runbot)
	echo "${mag}Running bot...${end}"
	docker exec -it pingpong_bot_1 bash -c "node bot.js"
	;;
	build)
	echo "${mag}Building docker images...${end}"
	docker-compose build
	;;
	up)
	echo "${mag}Uping containers...${end}"
	docker-compose up -d
	;;
esac
