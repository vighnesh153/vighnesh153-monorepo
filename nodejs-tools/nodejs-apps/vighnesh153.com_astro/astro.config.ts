import { defineConfig } from 'astro/config';

import prefetch from '@astrojs/prefetch';
import compress from 'astro-compress';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    tailwind({
      configFile: './tailwind.config.js',
      applyBaseStyles: false,
    }),
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
