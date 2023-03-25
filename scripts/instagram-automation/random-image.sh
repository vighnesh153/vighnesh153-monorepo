#!/bin/zsh

# download random image
function downloadRandomImage() {
  echo "Starting download of a random image... ⏳"
  npm -w @vighnesh153/instagram-automation run openai:random-image
  echo "Downloading of random image complete ✅"
}

function publishRandomImageToInstagram() {
  # Pull in the instagram credentials for virtual vibrance account
  virtualVibranceCypressInstagramCredentials

  # Publish random image to instagram
  echo "Publishing random image to instagram account: virtual.vibrance... ⏳"
  npm -w @vighnesh153/instagram-automation run cypress:run -- \
    --spec "cypress/e2e/instagram-ai-image.cy.ts" --browser electron --headed
  echo "Published random to instagram account: virtual.vibrance ✅"
}
