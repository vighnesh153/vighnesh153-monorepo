import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    RandomImage: './prerequisites/RandomImage.ts',
    RandomQuote: './prerequisites/RandomQuote.ts',
  },
  splitting: false,
  clean: true,
  minify: true,
  treeshake: true,
  format: ['esm'],
  outExtension() {
    return { js: `.esm.js` };
  },
}));
