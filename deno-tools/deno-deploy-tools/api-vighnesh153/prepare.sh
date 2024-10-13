#!/usr/bin/env bash

echo "Preparing the module ⌛️"

# Cleanup cache dir
rm -rf .local

# Create a cache of @vighnesh153/tools-platform-independent
mkdir -p .local/tools-platform-independent
mkdir -p .local/tools-platform-independent/models
cp ../../../nodejs-tools/nodejs-packages/tools-platform-independent/src/http-client/common.ts ./.local/tools-platform-independent/http_client_common.ts
cp ../../../nodejs-tools/nodejs-packages/tools-platform-independent/src/aws_config.ts ./.local/tools-platform-independent/aws_config.ts
cp ../../../nodejs-tools/nodejs-packages/tools-platform-independent/src/models/UserInfo.ts ./.local/tools-platform-independent/models/UserInfo.ts

deno fmt

echo "Preparation complete ✅"
