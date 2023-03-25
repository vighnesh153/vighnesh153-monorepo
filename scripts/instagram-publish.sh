#!/bin/zsh

# Automatically exit shell script on error
# https://stackoverflow.com/questions/2870992/automatic-exit-from-bash-shell-script-on-error
set -euxo pipefail

# Pull in all the secrets
# Check the "secrets-template.sh"
source "$(dirname "$0")/secrets.sh"

# download random image
echo "Starting download of a random image... ⏳"
npm -w @vighnesh153/instagram-automation run openai:random-image
echo "Downloading of random image complete ✅"

# Pull in the instagram credentials for virtual vibrance account
virtualVibranceCypressInstagramCredentials

# Publish random image to instagram
echo "Publishing random image to instagram account: virtual.vibrance... ⏳"
npm -w @vighnesh153/instagram-automation run cypress:run -- \
  --spec "cypress/e2e/instagram-ai-image.cy.ts" --browser electron --headed
echo "Published random to instagram account: virtual.vibrance ✅"

# generate random quote
echo "Starting build of a random quote... ⏳"
npm -w @vighnesh153/instagram-automation run openai:random-quote
echo "Build of random quote complete ✅"

# Pull in the instagram credentials for gotta.have.high.hopes account
gottaHaveHighHopesCypressInstagramCredentials

# Publish random quote to instagram
echo "Publishing random image to instagram account: gotta.have.high.hopes... ⏳"
npm -w @vighnesh153/instagram-automation run cypress:run -- \
  --spec "cypress/e2e/instagram-random-quote.cy.ts" --browser electron --headed
echo "Published random to instagram account: gotta.have.high.hopes ✅"
