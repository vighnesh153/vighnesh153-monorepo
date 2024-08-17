#!/usr/bin/env bash

echo "Preparing the module ⌛️"

# Cleanup cache dir
rm -rf .local

# Create a cache of @vighnesh153/tools-platform-independent
mkdir -p .local/tools-platform-independent
cp ../../../nodejs-tools/nodejs-packages/tools-platform-independent/src/http-client/common.ts ./.local/tools-platform-independent/http_client_common.ts
cp ../../../nodejs-tools/nodejs-packages/tools-platform-independent/src/aws_config.ts ./.local/tools-platform-independent/aws_config.ts

echo "Preparation complete ✅"
