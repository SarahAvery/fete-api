# Fete

### Group Members: [Matthew Banks](https://github.com/fictionalparakeets), [Sarah Avery](https://github.com/SarahAvery)

## Getting Started

## Front-End

1. Fork and Clone this ["repo"](https://github.com/SarahAvery/finals)
2. Follow the README

## Back-End

### Setup

1. Fork this repo, then clone your fork.
2. Install dependencies using 'yarn install'

### Creating The DB

Use the `psql -U development` command to login to the PostgreSQL server with the username `development` and the password `development`.

Create a database with the command `CREATE DATABASE finals_development;`.

Create a `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
PGHOST=localhost
PGUSER=development
PGDATABASE=finals_development
PGPASSWORD=development
PGPORT=5432
```

### Seeding

Run a the development server with `yarn start`.

Both of these achieve the same result.

- Make a `GET` request to `/api/debug/reset` with `curl http://localhost:8002/api/debug/reset`.
- Use the browser to navigate to `http://localhost:8002/api/debug/reset`.

### Run The Server

Running the server normally

```sh
yarn start
```

## Dependencies

### Back-End

- bcryptjs: 2.4.3
- body-parser: 1.18.3
- cors: 2.8.5
- dotenv: 7.0.0
- express: 4.16.4
- helmet: 3.18.0
- jsonwebtoken: 8.5.1
- nodemon: 2.0.12
- pg: 8.5.0
