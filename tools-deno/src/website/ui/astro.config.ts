import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import { vitePreprocess } from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    svelte({
      extensions: [".svelte", ".svelte.ts"],
      preprocess: vitePreprocess(),
    }),
  ],
  prefetch: true,
  build: {
    inlineStylesheets: "auto",
    format: "file",
  },
  output: "static",
  outDir: "./dist/ui",
  vite: {
    dev: {
      sourcemap: true,
    },
  },
});
