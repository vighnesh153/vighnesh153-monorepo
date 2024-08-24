import { defineConfig } from 'astro/config';

import compress from '@playform/compress';

import solid from '@astrojs/solid-js';
import svelte from '@astrojs/svelte';

import aws from 'astro-sst';

const isDevCommandRunning = process.argv[2] === 'dev';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [compress({ Logger: 2 }), svelte(), solid({ devtools: true })],
  prefetch: true,
  build: {
    inlineStylesheets: 'auto',
    format: 'file',
  },
  output: 'static',
  adapter: aws({
    deploymentStrategy: 'static',
  }),
  vite: {
    build: {
      sourcemap: isDevCommandRunning,
    },
  },
});
