import { defineConfig } from 'tsup';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default defineConfig(() => [
  {
    entry: {
      main: './src/index.ts',
    },
    splitting: false,
    clean: true,
    minify: true,
    treeshake: true,
    format: ['esm', 'iife'],
    globalName: 'RandomWord',
    outExtension({ format }) {
      let js: string | undefined;
      if (format === 'esm') js = `.js`;
      if (format === 'iife') js = `.umd.js`;
      return { js };
    },
  },
  {
    entry: {
      cli: './src/cli.ts',
    },
    splitting: false,
    clean: true,
    minify: true,
    treeshake: true,
    format: ['esm'],
    outExtension: () => ({ js: `.js` }),
  },
]);
