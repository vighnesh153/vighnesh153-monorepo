import { defineConfig } from "tsup";
import { LambdaFunctionName } from "@vighnesh153/tools/vighnesh153";

function constructEntryPoint(identifier: LambdaFunctionName) {
  return {
    [identifier]: `./src/${identifier}/mod.ts`,
  };
}

export default defineConfig(() => ({
  entry: {
    ...constructEntryPoint("createUploadPresignedUrl"),
    ...constructEntryPoint("getUser"),
    ...constructEntryPoint("googleAuthCallback"),
    ...constructEntryPoint("initiateGoogleLogin"),
    ...constructEntryPoint("initiateLogout"),
    ...constructEntryPoint("playground"),
    ...constructEntryPoint("privateS3BucketEventListener"),
    ...constructEntryPoint("publicS3BucketEventListener"),
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
