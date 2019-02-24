# Ping Pong

Project for analysis of the submission of configurable batch requests, for a benchmark analysis.

___

The project involves two applications:
* A **Bot** that triggers batch requests on API
* An **API** that handles the bot requests

The project structure has been configured in a **Docker**.

## Technologies Used

* NodeJS
* MongoDB
* Docker
* Docker-compose

## Getting Started

Follow the instructions below to run the project

### Requisitos

* [Docker](https://docs.docker.com/install/) 
* [Docker-compose](https://docs.docker.com/compose/install/) 

### Running the project

```
$ ./commands.sh start
```

### Available commands

Run the project

```
$ ./commands.sh start
```

Run the Bot only

```
$ ./commands.sh runbot
```

Build the images

```
$ ./commands.sh build
```

Start the containers and run them in the background
```
$ ./commands.sh up
```

## Behavior

Here are some explanations about how the project works:

### API

* Runs on port 3000
* **POST para /ping:** saves in a MongoDB document the record that there was a ping, and returns "pong"
* **GET para /pong/total:** returns a JSON with the total of registered pings

### Bot

* Capture the number of requests and batches entered at the prompt (minimum requisition number: 10000, minimum number of batches: 3)
* Performs requests in parallel batches in **POST /ping**
* Count how many seconds the process took
* Compare the number of requests sent with the value returned in **GET /pong/total**

### Docker

3 images were created:

* api
* bot
* mongo 
