import { defineConfig } from 'astro/config';

import prefetch from '@astrojs/prefetch';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [prefetch(), compress({ logger: 1 })],
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
