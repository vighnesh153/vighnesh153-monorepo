import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { CLIENT_BASE_DIR } from "./src/constants";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src/client",
  base: `/${CLIENT_BASE_DIR}`,
  plugins: [react()],
});
