#!/bin/bash

# start the first process
npx @vighnesh153/ftp-server --port 3000 &

# wait for any process to exit
wait -n

# exit with status of process that exited first
exit $?
