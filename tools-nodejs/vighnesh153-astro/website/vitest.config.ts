/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import solid from "vite-plugin-solid";

export default getViteConfig({
  plugins: [solid()],
  resolve: {
    conditions: ["development", "browser"],
  },
  test: {
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
