import { defineConfig } from 'astro/config';

import prefetch from '@astrojs/prefetch';
import compress from 'astro-compress';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    // import.meta.env.MODE === 'production' ? worker() : null,
    tailwind(),
    prefetch(),
    compress({ logger: 1 }),
  ],
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
