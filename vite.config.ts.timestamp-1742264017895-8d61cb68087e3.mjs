// vite.config.ts
import { defineConfig } from "file:///mnt/c/Users/Ray%20Feng/OneDrive/Documents/_web_dev/_projects/LoL/tritons_treasure/code/svelte5/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///mnt/c/Users/Ray%20Feng/OneDrive/Documents/_web_dev/_projects/LoL/tritons_treasure/code/svelte5/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [svelte()],
  base: "./",
  resolve: {
    alias: {
      $assets: path.resolve("./src/assets"),
      $apis: path.resolve("./src/lib/apis"),
      $stores: path.resolve("./src/lib/stores"),
      $components: path.resolve("./src/lib/components"),
      $dialog: path.resolve("./src/lib/dialog"),
      $lib: path.resolve("./src/lib")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvUmF5IEZlbmcvT25lRHJpdmUvRG9jdW1lbnRzL193ZWJfZGV2L19wcm9qZWN0cy9Mb0wvdHJpdG9uc190cmVhc3VyZS9jb2RlL3N2ZWx0ZTVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tbnQvYy9Vc2Vycy9SYXkgRmVuZy9PbmVEcml2ZS9Eb2N1bWVudHMvX3dlYl9kZXYvX3Byb2plY3RzL0xvTC90cml0b25zX3RyZWFzdXJlL2NvZGUvc3ZlbHRlNS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbW50L2MvVXNlcnMvUmF5JTIwRmVuZy9PbmVEcml2ZS9Eb2N1bWVudHMvX3dlYl9kZXYvX3Byb2plY3RzL0xvTC90cml0b25zX3RyZWFzdXJlL2NvZGUvc3ZlbHRlNS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gXCJAc3ZlbHRlanMvdml0ZS1wbHVnaW4tc3ZlbHRlXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtzdmVsdGUoKV0sXHJcbiAgYmFzZTogXCIuL1wiLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICRhc3NldHM6IHBhdGgucmVzb2x2ZShcIi4vc3JjL2Fzc2V0c1wiKSxcclxuICAgICAgJGFwaXM6IHBhdGgucmVzb2x2ZShcIi4vc3JjL2xpYi9hcGlzXCIpLFxyXG4gICAgICAkc3RvcmVzOiBwYXRoLnJlc29sdmUoXCIuL3NyYy9saWIvc3RvcmVzXCIpLFxyXG4gICAgICAkY29tcG9uZW50czogcGF0aC5yZXNvbHZlKFwiLi9zcmMvbGliL2NvbXBvbmVudHNcIiksXHJcbiAgICAgICRkaWFsb2c6IHBhdGgucmVzb2x2ZShcIi4vc3JjL2xpYi9kaWFsb2dcIiksXHJcbiAgICAgICRsaWI6IHBhdGgucmVzb2x2ZShcIi4vc3JjL2xpYlwiKSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMmMsU0FBUyxvQkFBb0I7QUFDeGUsU0FBUyxjQUFjO0FBQ3ZCLE9BQU8sVUFBVTtBQUdqQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsT0FBTyxDQUFDO0FBQUEsRUFDbEIsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsU0FBUyxLQUFLLFFBQVEsY0FBYztBQUFBLE1BQ3BDLE9BQU8sS0FBSyxRQUFRLGdCQUFnQjtBQUFBLE1BQ3BDLFNBQVMsS0FBSyxRQUFRLGtCQUFrQjtBQUFBLE1BQ3hDLGFBQWEsS0FBSyxRQUFRLHNCQUFzQjtBQUFBLE1BQ2hELFNBQVMsS0FBSyxRQUFRLGtCQUFrQjtBQUFBLE1BQ3hDLE1BQU0sS0FBSyxRQUFRLFdBQVc7QUFBQSxJQUNoQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
