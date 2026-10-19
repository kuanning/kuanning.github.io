import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative paths make this work both on a GitHub Pages project URL
  // and on a custom domain without editing the base path.
  base: "./",
});
