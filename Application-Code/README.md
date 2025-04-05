## Dockerfile in the client

FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]



### commands used
docker -t build jobnest-frontend .

docker images

docker network create jobnest

docker run --name jobnest-frontend-container --network=jobnest -d -p 3000:3000 jobnest-frontend

docker logs jobnest-frontend-container
-- ---------------------------------------------------

## MONGODB container

take the docker image for mongodb from dockerhub


 docker run --network=jobnest --name jobnest-mongodb -d -p 27017:27017 -v mongo_data:/data/db mongo:latest

-- --------------------------------------------------
 ## backend container

 FROM node:20-alpine

#### Install nodemon globally
RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm","start"]


-- -------------------
MONGO_URI=mongodb://jobnest-mongodb:27017/JobNestDevops
-- ------------------------
 docker build -t jobnest-backend


