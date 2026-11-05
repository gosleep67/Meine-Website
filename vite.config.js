import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, "index.html"),
        brille: resolve(import.meta.dirname, "brille.html"),
        schmuck: resolve(import.meta.dirname, "schmuck.html"),
      },
    },
  },
});
