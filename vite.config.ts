import { resolve } from "path";
import { defineConfig } from "vite";
import { rollupOptions, vitePlugins } from "./build";

export default defineConfig({
  build: {
    target: "modules",
    //打包文件目录
    outDir: "es",
    //静态文件目录
    assetsDir: "css",
    //压缩
    minify: false,
    //css分离
    cssCodeSplit: true,
    rollupOptions,
    lib: {
      entry: "./src/index.ts"
    }
  },
  plugins: vitePlugins,
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  }
});
