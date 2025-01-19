<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Furniture Rental API

## Description

A NestJS based API for a furniture rental service, supports individial furniture pieces and predefined furniture sets (combos).

## Features

* Furniture inventory management
* Combos inventory management
* Client management
* Rental lifecycle management
* Stock tracking 
* Location-based client information 

## Tecnologies
* NestJS
* PostgreSQL
* PrismaORM

## Prerequisites

* NodeJS (v18+)
* PostgreSQL (v13+) (skip if using docker)
* Docker (optional)
* npm or yarn 

## Installation

1. Clone the repository

```bash
git clone [repo_url]
```

2. Install the dependencies

```bash
yarn install
```
3. Create a `.env` file in the root of the project and add the following environment variables:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/furniture_rental"
```

4. Run database migrations

```bash
npx prisma migrate dev
```



## Project setup

To install all the needed packages:

```bash
yarn install
```

## Running the app

```bash
# development
yarn start:dev

# production mode
yarn start:prod
```

## API endpoints

### Furniture

* `GET /furniture` - Get all furniture items (supports filtering)
* `GET /furniture/:id` - Get a single furniture item by ID
* `POST /furniture` - Create a new furniture item
* `PATCH /furniture/:id` - Update a furniture item

### Combos

* `GET /combos` - Get all combos (supports filtering)
* `GET /combos/:id` - Get a single combo by ID
* `POST /combos` - Create a new combo

### Clients

* `GET /clients` - Get all clients (supports filtering)
* `GET /clients/:id` - Get a single client by ID
* `POST /clients` - Create a new client
* `PATCH /clients/:id` - Update a client

### Rentals

* `GET /rentals` - Get all rentals (supports filtering)
* `GET /rentals/client/:id` - Get all rentals for a specific client
* `GET /rentals/:id` - Get a single rental by ID
* `POST /rentals` - Create a new rental
* `PATCH /rentals/:id/deliver` - Mark rental as delivered
* `PATCH /rentals/:id/done` - Mark rental as done (restocks the items back to inventory)
* `PATCH /rentals/:id/cancel` - Cancel a rental (restocks the items back to inventory) **(not implemented yet)**

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
