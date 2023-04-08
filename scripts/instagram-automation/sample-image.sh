#!/bin/zsh

function publishSampleImageToInstagram() {
  # Pull in the instagram credentials for okie.dokie
  okieDokieCypressInstagramCredentials

  # Publish sample to instagram
  echo "Publishing sample image to instagram account: okie.dokie... ⏳"
  npm -w @vighnesh153/instagram-automation run cypress:run -- \
    --spec "cypress/e2e/instagram-publish-verification.cy.ts" --browser electron --headed
  echo "Published sample image to instagram account: okie.dokie ✅"
}
