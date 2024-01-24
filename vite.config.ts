import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      // 外部依赖
      external: [
        "vue",
        "highlight.js",
        "jest",
        "pinia",
        "sass",
        "sass-loader",
        "vite-plugin-md",
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
      ],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    lib: {
      entry: "./packages/index.ts",
      name: "tui",
    },
  },
});
