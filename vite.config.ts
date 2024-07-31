import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "./",
  resolve: {
    alias: {
      $assets: path.resolve("./src/assets"),
      $lib: path.resolve("./src/lib"),
      $apis: path.resolve("./src/lib/apis"),
      $components: path.resolve("./src/lib/components"),
    },
  },
});
