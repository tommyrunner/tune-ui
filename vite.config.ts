import { resolve } from "path";
import { defineConfig } from "vite";
import { rollupOptions, vitePlugins } from "./build";

export default defineConfig({
  build: {
    target: "modules",
    // 打包文件目录
    outDir: "dist",
    // 静态文件目录
    assetsDir: "assets",
    // 不压缩代码，方便调试
    minify: false,
    // 将所有CSS合并为一个文件，方便用户一次性引入样式
    cssCodeSplit: false,
    rollupOptions,
    lib: {
      entry: "./src/index.ts",
      // 根据输出格式生成文件名
      fileName: format => {
        return format === "es" ? "es/index" : "lib/index";
      }
    }
  },
  plugins: vitePlugins,
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  }
});
