import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: { main: './src/index.ts' },
  splitting: false,
  clean: true,
  dts: true,
  minify: true,
  treeshake: true,
  format: ['cjs', 'esm'],
  outExtension({ format }) {
    let js: string | undefined;
    if (format === 'cjs') js = `.commonjs.js`;
    if (format === 'esm') js = `.esm.js`;
    return { js };
  },
}));
