import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    main: './src/index.ts',
    cli: './src/cli.ts',
  },
  splitting: false,
  clean: true,
  minify: true,
  treeshake: true,
  format: ['esm', 'iife'],
  globalName: 'GithubGistUmd',
  outExtension({ format }) {
    let js: string | undefined;
    if (format === 'esm') js = `.esm.js`;
    if (format === 'iife') js = `.umd.js`;
    return { js };
  },
}));
