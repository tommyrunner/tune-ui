import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import type { Plugin } from "vite";

export const vitePlugins: Plugin[] = [
  vue(),
  dts({
    outDir: "dist/es",
    tsconfigPath: "tsconfig.json"
  }),
  dts({
    outDir: "dist/lib",
    tsconfigPath: "tsconfig.json"
  })
];
