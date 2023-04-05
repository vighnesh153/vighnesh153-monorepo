#!/bin/zsh

# download random animal image
function downloadRandomAnimalImage() {
  echo "Starting download of a random animal 🐶 image... ⏳"
  npm -w @vighnesh153/instagram-automation run openai:random-animal-image
  echo "Downloading of random animal image complete ✅"
}

function publishRandomAnimalImageToInstagram() {
  # Pull in the instagram credentials for fur.focus account
  furFocusCypressInstagramCredentials

  # Publish random animal image to instagram
  echo "Publishing random animal image to instagram account: fur.focus... ⏳"
  npm -w @vighnesh153/instagram-automation run cypress:run -- \
    --spec "cypress/e2e/instagram-random-animal-image.cy.ts" --browser electron --headed
  echo "Published random to instagram account: fur.focus ✅"
}
