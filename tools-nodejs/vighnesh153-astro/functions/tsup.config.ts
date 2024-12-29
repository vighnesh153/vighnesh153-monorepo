import { defineConfig } from "tsup";

export default defineConfig(() => ({
  entry: {
    main: "./src/index.ts",
  },
  outDir: "dist",
  splitting: true,
  clean: true,
  minify: false,
  dts: false,
  treeshake: true,
  external: [
    "firebase-admin",
    "firebase-functions",
  ],
  format: ["cjs"],
  outExtension: () => ({ js: `.js` }),
}));
