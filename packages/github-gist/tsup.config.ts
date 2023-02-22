import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: ['./src/index.ts'],
  splitting: false,
  clean: true,
  dts: true,
  minify: true,
  treeshake: true,
  format: ['cjs', 'esm', 'iife'],
  // The IIFE format will make use of this global name
  globalName: 'GithubGistUmd',
  outExtension({ format }) {
    let js: string | undefined;
    if (format === 'cjs') js = `.commonjs.js`;
    if (format === 'esm') js = `.esm.js`;
    if (format === 'iife') js = `.umd.js`;
    return { js };
  },
}));
