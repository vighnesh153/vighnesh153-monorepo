#!/bin/zsh

# Automatically exit shell script on error
# https://stackoverflow.com/questions/2870992/automatic-exit-from-bash-shell-script-on-error
set -euxo pipefail

# Pull in all the secrets
# Check the "secrets-template.sh"
source "$(dirname "$0")/secrets.sh"

source "$(dirname "$0")/random-image.sh"
source "$(dirname "$0")/random-joke.sh"
source "$(dirname "$0")/random-quote.sh"
source "$(dirname "$0")/random-word.sh"
source "$(dirname "$0")/random-animal-image.sh"
source "$(dirname "$0")/sample-image.sh"

npm -w @vighnesh153/instagram-automation run build

# downloadRandomImage
# downloadRandomAnimalImage
# downloadRandomJokeImage
# generateRandomQuote
# generateRandomWord

# Verify if instagram publish is working
# publishSampleImageToInstagram

# publishRandomImageToInstagram
# publishRandomAnimalImageToInstagram
# publishRandomJokeImageToInstagram
# publishRandomQuoteToInstagram
# publishRandomWordToInstagram
