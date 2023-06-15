#! /bin/bash

# Automatically exit shell script on error
# https://stackoverflow.com/questions/2870992/automatic-exit-from-bash-shell-script-on-error
set -exo pipefail

function closeExistingDockerContainers {
  ########################################
  #  Closing all existing containers...  #
  ########################################
  echo ""
  echo "🐳 Closing all running docker containers..."
  docker compose -f ./test/docker-compose.test.yml down
  echo "🐳 ✅ Containers closed successfully"
}

if [[ -z "${VERCEL}" ]]; then
  # Not inside a vercel environment
  closeExistingDockerContainers
else
  # Inside of a vercel environment
  echo "Inside of vercel environment"
fi
