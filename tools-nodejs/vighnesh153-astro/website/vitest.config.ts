/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

import tsconfigPaths from "vite-tsconfig-paths";

export default getViteConfig({
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
