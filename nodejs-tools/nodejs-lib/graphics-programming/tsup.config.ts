import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    main: './src/index.ts',
  },
  splitting: false,
  clean: true,
  minify: true,
  treeshake: true,
  format: ['esm'],
  outExtension({ format }) {
    let js: string | undefined;
    if (format === 'esm') js = `.js`;
    return { js };
  },
}));
