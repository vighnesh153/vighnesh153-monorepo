import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: ['./src/cli.ts'],
  splitting: false,
  format: ['esm'],
  publicDir: './src/public',
  clean: true,
  dts: true,
  minify: false, // todo: switch this
  treeshake: true,
}));
