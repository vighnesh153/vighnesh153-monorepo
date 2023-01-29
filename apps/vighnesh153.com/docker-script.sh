######################
#  Global variables  #
######################
sleepDuration=5


##################
#  Introduction  #
##################
echo "This script is not configured to be run on Windows. If you are using windows, please stop and get help 😊"
sleep $sleepDuration


#####################################
##  Checks if docker is installed  ##
#####################################
echo ""
echo "Checking if Docker is installed..."
if ! command -v docker &> /dev/null; then
  echo "❌ Docker is not installed. Please install docker by visiting the respective site"
  echo ""
  printf "\tMac: https://docs.docker.com/desktop/install/mac-install/"
  echo ""
  printf "\tLinux: https://docs.docker.com/desktop/install/linux-install/"
  echo ""
  exit
fi

echo "✅ Docker is installed"
# logs the docker version to the console
docker -v

###########################################
#  Open docker only if it is not running  #
###########################################
echo ""
echo "Starting docker..."
if (! docker stats --no-stream ); then
  # Mac OS command
  open /Applications/Docker.app
  # Waiting for initialization
  while (! docker stats --no-stream ); do
    # Docker takes a few seconds to initialize
    echo "Waiting for Docker to launch..."
    sleep 5
  done
  echo "✅ Docker is up and running"
else
  echo "✅ Docker is already running"
fi
