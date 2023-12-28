import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import prefetch from '@astrojs/prefetch';
import compress from 'astro-compress';

const isDevCommandRunning = process.argv[2] === 'dev';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [prefetch(), compress({ Logger: 2 }), svelte()],
  build: {
    inlineStylesheets: 'auto',
    format: 'file',
  },
  output: 'static',
  vite: {
    build: {
      sourcemap: isDevCommandRunning,
    },
  },
});
