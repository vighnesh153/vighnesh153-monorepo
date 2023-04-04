#!/bin/zsh

# generate random word
function generateRandomWord() {
  # generate random word
  echo "Starting build of a random word... ⏳"
  npm -w @vighnesh153/instagram-automation run openai:random-word
  echo "Build of random word complete ✅"
}

function publishRandomWordToInstagram() {
  # Pull in the instagram credentials for vocab.vital
  vocabVitalCypressInstagramCredentials

  # Publish random word to instagram
  echo "Publishing random image to instagram account: vocab.vital... ⏳"
  npm -w @vighnesh153/instagram-automation run cypress:run -- \
    --spec "cypress/e2e/instagram-random-word.cy.ts" --browser electron --headed
  echo "Published random word to instagram account: vocab.vital ✅"
}
