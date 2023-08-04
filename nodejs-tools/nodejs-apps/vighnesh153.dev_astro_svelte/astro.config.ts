import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import prefetch from '@astrojs/prefetch';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [prefetch(), compress({ logger: 1 }), svelte()],
  build: {
    inlineStylesheets: 'auto',
    format: 'file',
  },
  output: 'static',
  vite: {
    build: {
      sourcemap: true,
    },
  },
});
