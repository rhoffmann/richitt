# Richitt

Building a reddit clone

## Tasks

- Fire up a PostgresQL container with `docker-compose up` or set up one locally.

## Server

```
cd richitt-Server
yarn watch
yarn dev
```

Apollo/Express server will run on `localhost:4000`, you can pass another port with `PORT=<port> yarn dev`