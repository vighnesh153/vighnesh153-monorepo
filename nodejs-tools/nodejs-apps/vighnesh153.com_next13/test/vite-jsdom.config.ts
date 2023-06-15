import { defineProject, mergeConfig } from 'vitest/config';
import { sharedViteConfig } from './viteShared';

export default mergeConfig(
  sharedViteConfig,
  defineProject({
    test: {
      include: ['**/*.ui-{test,spec}.{ts,tsx}'],
      name: 'jsdom',
      environment: 'jsdom',
      setupFiles: ['./test/jsdom.setup.ts'],
    },
  })
);
