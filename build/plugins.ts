import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import type { Plugin } from "vite";

/**
 * 创建排除特定目录的插件
 * @returns Vite插件
 */
function excludeTestDir(): Plugin {
  return {
    name: "vite-plugin-exclude-test",
    enforce: "pre",
    resolveId(id) {
      // 排除test目录中的文件
      if (id.includes("/test/") || id.startsWith("test/")) {
        return { id, external: true };
      }
      return null;
    }
  };
}

export const vitePlugins: Plugin[] = [
  vue(),
  // 添加排除test目录的插件
  excludeTestDir(),
  dts({
    outDir: "dist/es",
    tsconfigPath: "tsconfig.json"
  }),
  dts({
    outDir: "dist/lib",
    tsconfigPath: "tsconfig.json"
  })
];
