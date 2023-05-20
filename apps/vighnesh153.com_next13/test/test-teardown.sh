#! /bin/bash

# Automatically exit shell script on error
# https://stackoverflow.com/questions/2870992/automatic-exit-from-bash-shell-script-on-error
set -euxo pipefail

########################################
#  Closing all existing containers...  #
########################################
echo ""
echo "🐳 Closing all running docker containers..."
docker compose -f ./test/docker-compose.test.yml down
echo "🐳 ✅ Containers closed successfully"
