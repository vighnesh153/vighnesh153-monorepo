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
  globalName: 'Vighnesh153Utils',
  outExtension({ format }) {
    let js: string | undefined;
    if (format === 'cjs') js = `.cjs`;
    if (format === 'esm') js = `.js`;
    if (format === 'iife') js = `.umd.js`;
    return { js };
  },
}));
