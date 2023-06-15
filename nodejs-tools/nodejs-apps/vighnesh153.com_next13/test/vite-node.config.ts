import { defineProject, mergeConfig } from 'vitest/config';
import { sharedViteConfig } from './viteShared';

export default mergeConfig(
  sharedViteConfig,
  defineProject({
    test: {
      name: 'node',
      environment: 'node',
      setupFiles: ['./test/node.setup.ts'],
    },
  })
);
