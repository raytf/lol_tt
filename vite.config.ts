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
      $apis: path.resolve("./src/lib/apis"),
      $stores: path.resolve("./src/lib/stores"),
      $components: path.resolve("./src/lib/components"),
      $lib: path.resolve("./src/lib"),
    },
  },
});
