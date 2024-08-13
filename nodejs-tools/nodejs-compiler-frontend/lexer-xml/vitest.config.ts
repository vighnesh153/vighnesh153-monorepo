import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      thresholds: {
        '100': true,
      },
      include: ['src/**'],
      exclude: ['src/index.ts'],
      reportOnFailure: true,
    },
  },
});
