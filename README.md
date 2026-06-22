## Description

The purpose of Kata is to build a subscription system for mobile offers.

## Project setup

## Setup back end project first

# Install dependencies

```bash
cd back
npm install
```


# Create and start postgres container

```bash
docker compose up
```

# Run seeds for database

```bash
npm run build
npm run prisma:seed
```

# Compile and run the back-end project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Setup frony end project

# Install dependencies

```bash
cd back
npm install
```

# Run

```bash
npm run dev
```