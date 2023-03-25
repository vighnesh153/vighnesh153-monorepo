#!/bin/zsh

# generate random quote
function generateRandomQuote() {
  # generate random quote
  echo "Starting build of a random quote... ⏳"
  npm -w @vighnesh153/instagram-automation run openai:random-quote
  echo "Build of random quote complete ✅"
}

function publishRandomQuoteToInstagram() {
  # Pull in the instagram credentials for gotta.have.high.hopes account
  gottaHaveHighHopesCypressInstagramCredentials

  # Publish random quote to instagram
  echo "Publishing random image to instagram account: gotta.have.high.hopes... ⏳"
  npm -w @vighnesh153/instagram-automation run cypress:run -- \
    --spec "cypress/e2e/instagram-random-quote.cy.ts" --browser electron --headed
  echo "Published random to instagram account: gotta.have.high.hopes ✅"
}
