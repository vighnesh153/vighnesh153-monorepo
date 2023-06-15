import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: ['./src/index.ts'],
  splitting: false,
  clean: true,
  minify: true,
  treeshake: true,
  format: 'cjs',
}));
