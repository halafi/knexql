# Overengineered, expensive, useless Todo app

## Deployment

1. `$ docker-compose up`
2. init db: `$ docker exec -it $(docker ps | grep knexql_api_1 | awk '{ print $1 }') /bin/sh -c 'npm run migrate'`
3. seed db: `$ docker exec -it $(docker ps | grep knexql_api_1 | awk '{ print $1 }') /bin/sh -c 'npm run seed'`

## Development

Setup Postgres:

1. `$ docker pull postgres:12.2`
2. `$ mkdir -p $HOME/docker/volumes/postgres`
3. `$ docker run --rm --name pg-dev -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=main -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres:12.2`
4. `$ yarn run initdb` (first time, or whenever)

Start what you want:

5. Run All `$ yarn start`
