import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    main: './src/index.ts',
  },
  splitting: false,
  clean: true,
  minify: true,
  treeshake: true,
  format: ['cjs', 'esm', 'iife'],
  globalName: 'GithubGistUmd',
  outExtension({ format }) {
    let js: string | undefined;
    if (format === 'cjs') js = `.commonjs.js`;
    if (format === 'esm') js = `.esm.js`;
    if (format === 'iife') js = `.umd.js`;
    return { js };
  },
}));
