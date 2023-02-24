import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    main: './src/index.ts',
  },
  splitting: false,
  clean: true,
  dts: true,
  minify: true,
  treeshake: true,
  format: ['cjs', 'esm', 'iife'],
  globalName: 'Vighnesh153Utils',
  outExtension({ format }) {
    let js: string | undefined;
    if (format === 'cjs') js = `.commonjs.js`;
    if (format === 'esm') js = `.esm.js`;
    if (format === 'iife') js = `.umd.js`;
    return { js };
  },
}));
