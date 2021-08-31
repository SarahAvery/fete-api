# Lighthouse Final Project API - (Fete)

## Setup

Install dependencies with `yarn install`.

## Creating The DB

Use the `psql -U development` command to login to the PostgreSQL server with the username `development` and the password `development`. This command **MUST** be run in a vagrant terminal, we are using the PostgreSQL installation provided in the vagrant environment.

Create a database with the command `CREATE DATABASE finals_development;`.

Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
PGHOST=localhost
PGUSER=development
PGDATABASE=finals_development
PGPASSWORD=development
PGPORT=5432
```

## Seeding

Run a the development server with `yarn start`.

Both of these achieve the same result.

- Make a `GET` request to `/api/debug/reset` with `curl http://localhost:8002/api/debug/reset`.
- Use the browser to navigate to `http://localhost:8002/api/debug/reset`.

The `development` data is random. Each time we seed we expect to see different appointments.

## Run The Server

Running the server normally
```sh
yarn start
```

Running the server so it returns an error when saving/deleting for testing the client's error handling capabilities
```sh
yarn run error
```
