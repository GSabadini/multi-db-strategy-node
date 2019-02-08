## MONGODB

```docker run \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=root \
  -d \
  mongo```

## MONGOCLIENT

```sudo docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link mongodb:mongodb \
  -d \
  mongoclient/mongoclient```

```docker exec -it mongodb \
  mongo --host localhost -u admin root -p root --authenticationDatabase root \
  --eval "db.getSiblingDB('herois').createUser({user: 'admin', pwd: 'admin', roles: [{role: 'readWrite', db: 'herois'}]})"```

## POSTGRES

```docker run \
    --name postgres \
    -e POSTGRES_USER=gfacina \
    -e POSTGRES_PASSWORD=123 \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres```

```docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer```

## NEO4J

```docker run \
    --publish=7474:7474 \
    --publish=7687:7687 \
    --volume=$HOME/neo4j/data:/data \
    -d \
    neo4j```

## DOCKER-COMPOSE

```docker-compose up -d```
