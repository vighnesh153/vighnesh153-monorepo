import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    react(),
    mdx(),
  ],
  prefetch: true,
  build: {
    inlineStylesheets: "auto",
    format: "file",
  },
  output: "static",
  vite: {
    dev: {
      sourcemap: true,
    },
  },
});
