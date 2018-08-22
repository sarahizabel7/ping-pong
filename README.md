# Ping Pong

Projeto para análise de envio de requisições em lotes configuráveis, a fim de uma análise comparativa (benchmark).

O projeto envolve duas aplicações:
* Um **Bot** que dispara requisições em lotes na API
* Uma **API** que lida com requisições do Bot

A estrutura do projeto foi configurada em um **Docker**.

## Tecnologias utilizadas

* NodeJS
* MongoDB
* Docker
* Docker-compose

## Getting Started

Segue abaixo instruções para rodar o projeto.

### Requisitos

* [Docker](https://docs.docker.com/install/) 
* [Docker-compose](https://docs.docker.com/compose/install/) 

### Rodando o Projeto

```
$ ./commands.sh start
```

### Comandos disponíveis

Rodar o projeto

```
$ ./commands.sh start
```

Rodar somente o Bot

```
$ ./commands.sh runbot
```

Buildar as imagens

```
$ ./commands.sh build
```

Subir os containers e rodá-los em background

```
$ ./commands.sh up
```

## Funcionamento

Segue abaixo algumas explicações sobre o funcionamento do projeto

### API

* Roda na porta 3000
* **POST para /ping:** salva em um documento do MongoDB o registro de que houve um ping, e devolve "pong"
* **GET para /pong/total:** devolve um JSON com o total de pings registrados

### Bot

* Captura o número de requisições e de lotes inseridos no prompt (número mínimo de requisição: 10000, número mínimo de lotes: 3)
* Realiza requisições em lotes paralelos para o **POST /ping**
* Contabiliza quantos segundos levou o processo
* Compara o número de requisições enviadas com o valor retornado no **GET /pong/total**

### Docker

Foram criadas 3 imagens:

* api
* bot
* mongo 