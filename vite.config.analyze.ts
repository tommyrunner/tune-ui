import { resolve } from "path";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import { rollupOptions, vitePlugins } from "./build";

export default defineConfig({
  build: {
    target: "modules",
    outDir: "dist",
    assetsDir: "assets",
    minify: false,
    cssCodeSplit: true,
    rollupOptions,
    lib: {
      entry: "./src/index.ts"
    }
  },
  plugins: [
    ...vitePlugins,
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "stats.html"
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  }
});
