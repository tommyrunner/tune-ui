import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import type { Plugin } from "vite";

export const vitePlugins: Plugin[] = [
  vue(),
  dts({
    outDir: "dist/es",
    tsconfigPath: "tsconfig.build.json",
    include: ["src/**/*"],
    exclude: ["test/**/*", "docs/**/*", "node_modules/**/*"],
    insertTypesEntry: true,
    copyDtsFiles: true,
    logLevel: "info",
    entryRoot: "src"
  }),
  dts({
    outDir: "dist/lib",
    tsconfigPath: "tsconfig.build.json",
    include: ["src/**/*"],
    exclude: ["test/**/*", "docs/**/*", "node_modules/**/*"],
    insertTypesEntry: true,
    copyDtsFiles: true,
    logLevel: "info",
    entryRoot: "src"
  })
];
