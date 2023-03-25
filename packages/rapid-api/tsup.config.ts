import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    main: './src/index.ts',
  },
  splitting: false,
  clean: true,
  minify: true,
  external: ['axios'],
  treeshake: true,
  format: ['esm'],
  outExtension() {
    return { js: `.esm.js` };
  },
}));
