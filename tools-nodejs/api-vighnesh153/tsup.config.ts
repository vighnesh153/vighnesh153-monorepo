import { defineConfig } from "tsup";

export default defineConfig(() => ({
  entry: {
    googleAuthCallback: "./src/googleAuthCallback/mod.ts",
    initiateGoogleLogin: "./src/initiateGoogleLogin/mod.ts",
    initiateLogout: "./src/initiateLogout/mod.ts",
    getUser: "./src/getUser/mod.ts",
    playground: "./src/playground/mod.ts",
  },
  splitting: false,
  external: [
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/lib-dynamodb",
    "@types/aws-lambda",
    "@aws-sdk/types",
  ],
  clean: true,
  minify: true,
  treeshake: true,
  format: "esm",
}));
