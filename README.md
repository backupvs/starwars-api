## Description

API to work with data from Star Wars universe. </br>
Seeded by data from <a href="https://swapi.dev">SWAPI.dev</a>
You can see deployed app here: https://starwars-api-nestjs.fly.dev/api

## Running with Docker
1. Create and configure '.env' file in root directory:
```
  PORT=<port>

  # Postgres
  POSTGRES_HOST=<hostname>
  POSTGRES_USER=<username>
  POSTGRES_PASSWORD=<password>
  POSTGRES_DB=<database name>

  # S3
  S3_BUCKET=<bucket name>
  S3_REGION=<region>
  S3_ACCESS_KEY=<access key>
  S3_SECRET_ACCESS_KEY=<secret access key>

  # JWT
  JWT_SECRET=<jwt secret key>
  JWT_EXPIRES_IN=<expiration time> (e.g. 60s)
```
2. Create and configure 'postgres.env' file in root directory:
```
  POSTGRES_USER=<username>
  POSTGRES_PASSWORD=<password>
  POSTGRES_DB=<database name>
```
3. Type docker compose command:
```bash
$ docker-compose up --build -d
```
It will launch docker container, migrate and seed database.
Then server will be hosted on <b>localhost:3000</b>. And you can access Swagger UI on localhost:3000/api

## Running without Docker

1. Create and configure '.env' file as described in previous section.
2. Install dependencies:
```bash
$ npm install
```
3. Run migrations:
```bash
$ npm run typeorm:run-migrations
```
4. Run seeder:
```bash
$ npm run seeder:seed
```
5. Run app:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```
