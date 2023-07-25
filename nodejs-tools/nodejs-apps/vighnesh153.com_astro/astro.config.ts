import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import prefetch from '@astrojs/prefetch';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [svelte(), prefetch(), compress({ logger: 1 })],
  build: {
    inlineStylesheets: 'auto',
    format: 'file',
  },
  vite: {
    build: {
      sourcemap: true,
    },
  },
});
