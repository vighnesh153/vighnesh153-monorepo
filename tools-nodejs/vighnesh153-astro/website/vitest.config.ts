/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    conditions: ["development", "browser"],
  },
  test: {
    include: ["./src/**/*.test.ts", "./src/**/*.test.tsx"],
    globals: true,
    exclude: [
      "e2e",
      ".astro",
      ".turbo",
      "playwright-report",
      "node_modules",
      "dist",
    ],
  },
});
