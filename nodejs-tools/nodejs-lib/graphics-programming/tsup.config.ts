import { defineConfig } from "tsup";

export default defineConfig(({ watch }) => ({
  entry: {
    main: "./src/index.ts",
  },
  splitting: false,
  // clean: true,
  minify: !watch,
  treeshake: true,
  format: ["esm"],
  outExtension({ format }) {
    let js: string | undefined;
    if (format === "esm") js = `.js`;
    return { js };
  },
}));
