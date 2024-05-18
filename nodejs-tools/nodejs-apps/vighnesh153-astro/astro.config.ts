import { type AstroIntegration } from 'astro';

import { defineConfig } from 'astro/config';

import compress from '@playform/compress';

import solid from '@astrojs/solid-js';
import svelte from '@astrojs/svelte';

const isDevCommandRunning = process.argv[2] === 'dev';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    // Remove the following type gymnastics when the following issue is fixed.
    // https://github.com/PlayForm/Compress/issues/329
    compress({ Logger: 2 }) as unknown as AstroIntegration,
    svelte(),
    solid({ devtools: true }),
  ],
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
