/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import solid from "vite-plugin-solid";

import tsconfigPaths from "vite-tsconfig-paths";

export default getViteConfig({
  plugins: [tsconfigPaths(), solid()],
  resolve: {
    conditions: ["development", "browser"],
  },
  test: {
    include: ["./src/**/*.test.ts", "./src/**/*.test.tsx"],
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
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
