import { defineConfig } from "tsup";

export default defineConfig(() => ({
  entry: {
    main: "./src/index.ts",
  },
  splitting: false,
  clean: true,
  minify: false,
  dts: true,
  treeshake: true,
  format: ["esm"],
  outExtension: () => ({ js: `.js` }),
}));
