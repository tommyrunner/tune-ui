import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue()],
  publicDir: path.resolve(__dirname, "public"),
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src")
    }
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    open: true,
    cors: true
  }
});
