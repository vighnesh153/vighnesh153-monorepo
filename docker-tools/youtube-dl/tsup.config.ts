import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    main: './src/index.ts',
  },
  splitting: false,
  minify: true,
  treeshake: true,
  format: 'esm',
  publicDir: './src/views',
  outExtension: () => ({ js: '.js' }),
}));
