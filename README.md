# Overengineered TODO app

## Deployment (Production or Staging)

1. `$ docker-compose up`
2. init db: `$ docker exec -it $(docker ps | grep portfolio_api_1 | awk '{ print $1 }') /bin/sh -c 'npm run migrate'`
3. seed db: `$ docker exec -it $(docker ps | grep portfolio_api_1 | awk '{ print $1 }') /bin/sh -c 'npm run seed'`

## Development

### API

Setup postgres:

1. `$ docker pull postgres:12.2`
2. `$ mkdir -p $HOME/docker/volumes/postgres`
3. `$ docker run --rm --name pg-dev -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=main -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres:12.2`
4. `$ cd api && npm run initdb`

### Graphql

1. Setup postgres and run it (see above)
2. Run API `$ cd api && npm run start` (default port 8000)
3. Run GraphQL dev server `$ cd express-graphql && npm run start` (default port 8001)

### Frontend

1. Do the above
2. Run Frontend `$ cd frontend && npm run start` (default port 8080)

## TODOs

- [ ] Secure ENV vars
- [ ] Production setup
