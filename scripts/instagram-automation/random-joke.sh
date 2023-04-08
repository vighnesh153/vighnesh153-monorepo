#!/bin/zsh

# download random joke image
function downloadRandomJokeImage() {
  echo "Starting download of a random joke 🐶 image... ⏳"
  npm -w @vighnesh153/instagram-automation run openai:random-joke
  echo "Downloading of random joke image complete ✅"
}

function publishRandomJokeImageToInstagram() {
  # Pull in the instagram credentials for chuckle.champs account
  chuckleChampsCypressInstagramCredentials

  # Publish random joke image to instagram
  echo "Publishing random joke image to instagram account: chuckle.champs... ⏳"
  npm -w @vighnesh153/instagram-automation run cypress:run -- \
    --spec "cypress/e2e/instagram-random-joke-image.cy.ts" --browser electron --headed
  echo "Published random joke to instagram account: chuckle.champs ✅"
}
