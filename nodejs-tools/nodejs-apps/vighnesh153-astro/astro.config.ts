import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import compress from '@playform/compress';

const isDevCommandRunning = process.argv[2] === 'dev';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [compress({ Logger: 2 }), svelte()],
  prefetch: true,
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
