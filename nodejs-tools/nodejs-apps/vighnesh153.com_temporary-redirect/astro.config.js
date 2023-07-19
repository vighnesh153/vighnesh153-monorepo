import { defineConfig } from 'astro/config';

import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [compress({ logger: 1 })],
  build: {
    inlineStylesheets: 'auto',
    format: 'file',
  },
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
