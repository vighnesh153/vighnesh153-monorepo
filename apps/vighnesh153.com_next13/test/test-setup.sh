#! /bin/bash

# Automatically exit shell script on error
# https://stackoverflow.com/questions/2870992/automatic-exit-from-bash-shell-script-on-error
set -exo pipefail

function openDockerDaemonIfNotRunning {
  ###########################################
  #  Open docker only if it is not running  #
  ###########################################
  echo ""
  echo "Attempting to start docker..."
  if (! docker stats --no-stream ); then
    # Mac OS command
    open /Applications/Docker.app
    # Waiting for initialization
    while (! docker stats --no-stream ); do
      # Docker takes a few seconds to initialize
      echo "Waiting for Docker to launch..."
      sleep 5
    done
    echo "🐳 ✅ Docker is up and running"
  else
    echo "🐳 ✅ Docker is already running"
  fi
}

function closeExistingDockerContainers {
  ########################################
  #  Closing all existing containers...  #
  ########################################
  echo ""
  echo "🐳 Attempting to close all existing containers (if any)"
  docker compose -f ./test/docker-compose.test.yml down
  echo "🐳 ✅ Containers closed successfully"
}

function turnOnDockerContainers {
  #####################################
  #  Turning up docker containers...  #
  #####################################
  echo ""
  echo "🐳 Turning up docker containers..."
  docker compose -f ./test/docker-compose.test.yml up -d
  echo "🐳 ✅ Containers are up and running"
}

if [[ -z "${VERCEL}" ]]; then
  # Not inside a vercel environment
  docker -v
  openDockerDaemonIfNotRunning
  closeExistingDockerContainers
  turnOnDockerContainers
  export DATABASE_URL="postgresql://postgres:example@localhost:5432/myApp?schema=public"
  npm run prisma:generate
  npm run prisma:migrate:deploy
else
  # Inside of a vercel environment
  npm run prisma:generate:vercel
  npm run prisma:migrate:deploy:vercel
fi
