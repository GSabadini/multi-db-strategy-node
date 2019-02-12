# Multi database strategy

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/GSabadini/multi-db-strategy-node/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/GSabadini/multi-db-strategy-node/?branch=master) [![Build Status](https://scrutinizer-ci.com/g/GSabadini/multi-db-strategy-node/badges/build.png?b=master)](https://scrutinizer-ci.com/g/GSabadini/multi-db-strategy-node/build-status/master)

## MongoDB

```
docker run \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=root \
  -e MONGO_INITDB_DATABASE=heroes \
  -d \
  mongo

## MONGOCLIENT

docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link mongodb:mongodb \
  -d \
  mongoclient/mongoclient

docker exec -it mongodb \
  mongo --host localhost -u admin root -p root --authenticationDatabase root \
  --eval "db.getSiblingDB('heroes').createUser({user: 'admin', pwd: 'admin', roles: [{role: 'readWrite', db: 'heroes'}]})"
  ```

## Postgres

```
docker run \
    --name postgres \
    -e POSTGRES_USER=root \
    -e POSTGRES_PASSWORD=root \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres 

## ADMINER 

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer
 ```

## Neo4j ( Not implemented )

```
docker run \
    --publish=7474:7474 \
    --publish=7687:7687 \
    --volume=$HOME/neo4j/data:/data \
    -d \
    neo4j 
```

## Docker-compose

```
docker-compose up -d
```
