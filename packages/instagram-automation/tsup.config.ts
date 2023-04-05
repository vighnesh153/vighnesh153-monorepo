import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    RandomAnimalImage: './prerequisites/RandomAnimalImage.ts',
    RandomImage: './prerequisites/RandomImage.ts',
    RandomQuote: './prerequisites/RandomQuote.ts',
    RandomWord: './prerequisites/RandomWord.ts',
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
