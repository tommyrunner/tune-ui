import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: [
        "vue",
        "highlight.js",
        "jest",
        "pinia",
        "sass",
        "sass-loader",
        "vite-plugin-md",
        "vue-router",
        "@babel/preset-env",
        "@vitejs/plugin-vue",
        "@vue/reactivity",
        "@vue/test-utils",
        "babel-jest",
        "babel-preset-vite",
        "eslint",
        "eslint-plugin-vue",
        "vite",
        "vue-jest",
        "commitizen",
        "cz-conventional-changelog",
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
    lib: {
      entry: "./packages/index.ts",
      name: "t-ui",
    },
  },
});
