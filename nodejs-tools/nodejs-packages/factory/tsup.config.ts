import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    main: './src/index.ts',
  },
  splitting: false,
  minify: true,
  treeshake: true,
  format: ['cjs', 'esm'],
  outExtension({ format }) {
    let js: string | undefined;
    if (format === 'cjs') js = `.cjs`;
    if (format === 'esm') js = `.js`;
    return { js };
  },
}));
