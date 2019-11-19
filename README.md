# Node - Koa - Typescript - Typeorm - Bootstrap

## Pre-reqs

To build and run this app locally you will need:

- Install [Node.js](https://nodejs.org/en/)

## Features:

- Nodemon - server auto-restarts when code changes
- Koa v2
- TypeORM (SQL DB) with basic CRUD included
- Swagger decorator (auto generated swagger docs)
- Class-validator - Decorator based entities validation
- Cron jobs prepared

## Included middleware:

- koa-router
- koa-bodyparser
- Winston Logger
- JWT auth koa-jwt
- Helmet (security headers)
- CORS

# Getting Started

- Clone the repository

- Install dependencies

```
cd <project_name>
npm install
```

- Run the project directly in TS

```
npm run watch-server
```

- Build and run the project in JS

```
npm run build
npm run start
```

- Run integration or load tests

```
npm run test:integration
npm run test:load
```

## Environment variables

Create a .env file (or just rename the .example.env) containing all the env variables you want to set, dotenv library will take care of setting them. This project is using three variables at the moment:

- PORT -> port where the server will be started on, Heroku will set this env variable automatically
- NODE_ENV -> environment, development value will set the logger as debug level, also important for CI. In addition will determine if the ORM connects to the DB through SSL or not.
- JWT_SECRET -> secret value, JWT tokens should be signed with this value
- DATABASE_URL -> DB connection data in connection-string format.

## Getting TypeScript

TypeScript itself is simple to add to any project with `npm`.

```
npm install -D typescript
```

If you're using VS Code then you're good to go!
VS Code will detect and use the TypeScript version you have installed in your `node_modules` folder.
For other editors, make sure you have the corresponding [TypeScript plugin](http://www.typescriptlang.org/index.html#download-links).
