# Description

The purpose of Kata is to build a subscription system for mobile offers.

# Project setup

In a terminal:
Go to /back directory -> install dependencies & config .env file -> create postgres container -> seed the database -> run the project;

In another terminal:
Got to /front directory -> install dependencies & config .env file -> run the project;

# Setup back end project first

### Install dependencies & config .env file

```bash
cd back
npm install
cp .env.example .env
```


### Create and start postgres container

```bash
docker compose up
```

### Run seeds for database

```bash
npm run build
npm run prisma:seed
```

### Compile and run the back-end project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Documentation

[http://localhost:3000/api](http://localhost:3000/api)


# Setup front end project

### Install dependencies & config .env file

```bash
cd back
npm install
cp .env.example .env.local
```

### Run the project

```bash
npm run dev
```


### Start

[http://localhost:3002](http://localhost:3002)