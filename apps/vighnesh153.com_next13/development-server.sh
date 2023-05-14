# Automatically exit shell script on error
# https://stackoverflow.com/questions/2870992/automatic-exit-from-bash-shell-script-on-error
set -euxo pipefail

#####################################
##  Checks if docker is installed  ##
#####################################
echo ""
echo "🐳 Checking if Docker is installed..."
if ! command -v docker &> /dev/null; then
  echo "🐳 ❌ Docker is not installed. Please install docker by visiting the respective site"
  echo ""
  printf "\tMac: https://docs.docker.com/desktop/install/mac-install/"
  echo ""
  printf "\tLinux: https://docs.docker.com/desktop/install/linux-install/"
  echo ""
  exit
fi

echo "🐳 ✅ Docker is installed"
# logs the docker version to the console
docker -v

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

########################################
#  Closing all existing containers...  #
########################################
echo ""
echo "🐳 Attempting to close all existing containers (if any)"
docker compose down
echo "🐳 ✅ Containers closed successfully"

#####################################
#  Turning up docker containers...  #
#####################################
echo ""
echo "🐳 Turning up docker containers..."
docker compose up -d
echo "🐳 ✅ Containers are up and running"

###################################
#  Running the NextJS dev server  #
###################################
echo ""
echo "⏳Starting the NextJS development server"
next dev
echo "✅ NextJS development server terminated"

########################################
#  Closing all existing containers...  #
########################################
echo ""
echo "🐳 Closing all running docker containers..."
docker compose down
echo "🐳 ✅ Containers closed successfully"
