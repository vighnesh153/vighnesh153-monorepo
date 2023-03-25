#!/bin/zsh

# Automatically exit shell script on error
# https://stackoverflow.com/questions/2870992/automatic-exit-from-bash-shell-script-on-error
set -euxo pipefail

# Pull in all the secrets
# Check the "secrets-template.sh"
source "$(dirname "$0")/secrets.sh"

source "$(dirname "$0")/random-image.sh"
source "$(dirname "$0")/random-quote.sh"

publishRandomImageToInstagram
publishRandomQuoteToInstagram
