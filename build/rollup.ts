import type { RollupOptions, OutputOptions } from "rollup";

/**
 * 创建输出配置
 * @param format 输出格式
 * @returns Rollup输出配置
 * @description 根据format创建对应的输出配置
 */
const createOutput = (format: "es" | "cjs"): OutputOptions => ({
  format,
  // 不用打包成.es.js,这里我们想把它打包成.js
  entryFileNames: "[name].js",
  // 让打包目录和我们目录对应
  preserveModules: true,
  // 配置打包根目录
  dir: `dist/${format === "es" ? "es" : "lib"}`,
  // 设置打包根目录为src
  preserveModulesRoot: "src",
  // 所有CSS会被合并到一个文件，不需要特殊处理
  assetFileNames: "assets/[name].[ext]"
});

/** Rollup配置 */
export const rollupOptions: RollupOptions = {
  // 忽略打包vue文件
  external: ["vue"],
  // 入口文件
  input: ["src/index.ts"],
  // 输出配置
  output: [
    // ES Module格式输出
    createOutput("es"),
    // CommonJS格式输出
    createOutput("cjs")
  ]
};
