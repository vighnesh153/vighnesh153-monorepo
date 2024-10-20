import { defineConfig } from "tsup";

export default defineConfig(() => ({
  entry: {
    main: "./src/index.ts",
  },
  splitting: false,
  clean: true,
  minify: true,
  external: ["@aws-sdk/client-dynamodb", "@aws-sdk/lib-dynamodb"],
  treeshake: true,
  format: "esm",
  outExtension: () => ({ js: ".js" }),
}));
