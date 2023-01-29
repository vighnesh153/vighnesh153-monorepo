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
docker start <container-id>

# Stop a running container (gracefully)
docker stop <container-id>

# Kill a container (stops abruptly)
docker kill <container-id>

# Run a command on a already running container
docker exec -it <container-id>
```

## Options

- `--rm`: Remove the container after exiting
- `-it`: Starts the container in an interactive mode

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
