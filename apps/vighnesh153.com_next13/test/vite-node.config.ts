import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    globals: true,
    name: 'node',
    environment: 'node',
    setupFiles: ['./test/node.setup.ts'],
  },
});
