# All things Docker

## Hello world

```shell
# Pulls the image automatically if it doesn't exist on your system and then runs it
docker run hello-world
```

## Commands

```shell
# List down all containers
docker ps --all

# Creates a new container and runs it
docker run <image>

# Start an existing container (get container id from `docker ps --all`)
docker start <container-id-or-name>

# Stop a running container (gracefully)
docker stop <container-id-or-name>

# Kill a container (stops abruptly)
docker kill <container-id-or-name>

# Run a command on a already running container
docker exec -it <container-id-or-name>

# Creating an image
docker build -t vighnesh153/mymongo:latest .
```

## Run command options

- `--rm`: Remove the container after exiting
- `-it`: Starts the container in an interactive mode
- `-d`: Detached mode: run command in the background
- `--name`: Give a name to the container
- `-p <Host-Machine-Port>:<Container-Exposed-Port>`: Bind the host machine port to container port

## Busy box

```shell
# does nothing
docker run busybox

# lists directory from the busybox container instance
docker run busybox ls

# Remove the container after running the `ls` command in it
docker run --rm busybox ls
```

## Mongo

```shell
# Mongo interactive
docker run --rm -it mongo bash
```

## Dockerfile

Blueprint to create a docker image

### MongoDB image

```dockerfile
FROM alpine

# Adds some random utils
RUN apk add binutils

# Find repositories here: https://wiki.alpinelinux.org/wiki/Repositories
RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.9/main" >> /etc/apk/repositories
RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.9/community" >> /etc/apk/repositories
RUN apk update

RUN apk add mongodb

# This will make sure that DB data doesn't get deleted when
# container is stopped or removed
VOLUME [ "/data/db" ]

WORKDIR /data
EXPOSE 27017

# default command
CMD [ "mongod" ]
```

### NodeJS project image

- Build the image: `docker build -t vighnesh153/sample-node-app:latest .`
- Run: `docker run --rm -p 3004:3002 vighnesh153/sample-node-app`

```dockerfile
FROM node:lts-alpine

WORKDIR /vighnesh153

# Copy the package.json file first so that all commands
# till `RUN npm install` can be cached during the next build
COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./ ./

EXPOSE 3002

CMD [ "npm", "start" ]
```
