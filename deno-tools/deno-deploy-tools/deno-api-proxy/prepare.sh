#!/usr/bin/env bash

echo "Preparing the module ⌛️"

# Create cache dir
rm -rf .local
mkdir -p .local

# Create a cache of files
cp ../../../nodejs-tools/nodejs-packages/tools-platform-independent/src/aws_config.ts ./.local/aws_config.ts

echo "Preparation complete ✅"
