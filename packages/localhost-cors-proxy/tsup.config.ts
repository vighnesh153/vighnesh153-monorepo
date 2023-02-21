import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: ['./src/cli.ts'],
  splitting: false,
  clean: true,
  dts: true,
  minify: true,
}));
