import { defineProject } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export const sharedViteConfig = defineProject({
  test: {
    globals: true,
  },
  plugins: [tsconfigPaths()],
});
