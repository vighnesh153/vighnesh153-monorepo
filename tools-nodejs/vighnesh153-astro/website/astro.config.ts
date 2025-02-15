import { defineConfig } from "astro/config";

import compress from "@playform/compress";

import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";

const isDevCommandRunning = process.argv[2] === "dev";

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    compress({ Logger: 2 }),
    solid({ devtools: true }),
    mdx(),
  ],
  prefetch: true,
  build: {
    inlineStylesheets: "auto",
    format: "file",
  },
  output: "static",
  vite: {
    build: {
      sourcemap: isDevCommandRunning,
    },
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
  },
});
