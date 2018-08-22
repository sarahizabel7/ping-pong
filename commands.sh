#!/bin/bash

command=$1
mag=$'\e[1;35m'
end=$'\033[0;39m'

case $command in
	start)
	echo "${mag}Building docker images and uping containers...${end}"
	sudo docker-compose up -d --build &&
	sudo docker exec -it pingpong_app_1 bash -c "node bot/server.js"
	;;
	runbot)
	echo "${mag}Running bot...${end}"
	sudo docker exec -it pingpong_app_1 bash -c "node bot/server.js"
	;;
	build)
	echo "${mag}Building docker images...${end}"
	sudo docker-compose build
	;;
	up)
	echo "${mag}Uping containers...${end}"
	sudo docker-compose up
	;;
	stop)
	echo "${mag}Stoping and removing containers...${end}"
	sudo docker-compose stop
	;;
	down)
	echo "${mag}Stoping containers...${end}"
	sudo docker-compose down
	;;
esac