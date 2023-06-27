import { defineConfig } from 'astro/config';

import prefetch from '@astrojs/prefetch';
import sitemap from '@astrojs/sitemap';
import rome from 'astro-rome';
import compress from 'astro-compress';
import critters from 'astro-critters';
// import worker from 'astrojs-service-worker';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    // import.meta.env.MODE === 'production' ? worker() : null,
    sitemap(),
    critters({ logger: 1 }),
    prefetch(),
    rome({ logger: 1 }),
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
