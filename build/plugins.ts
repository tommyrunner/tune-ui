import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import type { Plugin } from "vite";

export const vitePlugins: Plugin[] = [
  vue(),
  dts({
    outDir: "dist/es"
  }),
  dts({
    outDir: "dist/lib"
  }),
  {
    name: "vite:import-css",
    apply: "build",
    enforce: "post",
    renderChunk(code, chunk) {
      if (!chunk.isEntry && chunk.type === "chunk" && /\index.(js)$/i.test(chunk.fileName) && chunk.name.includes("packages/")) {
        const fileNames = chunk.fileName.split("/");
        const str = fileNames[fileNames.length - 1].split(".")[0];
        return `import './${str}.css';\n${code}`;
      }
    }
  }
];
