import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: ['./src/server/cli.ts'],
  splitting: false,
  format: ['esm'],
  clean: true,
  dts: false,
  minify: true,
  treeshake: true,
}));
