import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    globals: true,
    name: 'jsdom',
    environment: 'jsdom',
    setupFiles: ['./test/jsdom.setup.ts'],
  },
});
