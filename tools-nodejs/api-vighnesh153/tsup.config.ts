import { defineConfig } from "tsup";
import { constructRoutesForProd } from "@vighnesh153/tools/vighnesh153";

const SST_CONFIG = constructRoutesForProd();

function constructEntryPoint(identifier: string) {
  return {
    [identifier]: `./src/${identifier}/mod.ts`,
  };
}

export default defineConfig(() => ({
  entry: {
    ...constructEntryPoint(SST_CONFIG.api.createUploadPresignedUrl.identifier),
    ...constructEntryPoint(SST_CONFIG.api.getUser.identifier),
    ...constructEntryPoint(SST_CONFIG.api.googleAuthCallback.identifier),
    ...constructEntryPoint(SST_CONFIG.api.initiateGoogleLogin.identifier),
    ...constructEntryPoint(SST_CONFIG.api.initiateLogout.identifier),
    ...constructEntryPoint(SST_CONFIG.api.playground.identifier),
  },
  splitting: false,
  external: [
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/client-s3",
    "@aws-sdk/lib-dynamodb",
    "@types/aws-lambda",
    "@aws-sdk/types",
  ],
  clean: true,
  minify: true,
  treeshake: true,
  format: "esm",
}));
