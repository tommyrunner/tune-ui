import type { RollupOptions, OutputOptions } from "rollup";

/** CSS资源信息接口 */
interface AssetInfo {
  type: string;
  name?: string;
}

/**
 * 创建资源文件名
 * @param assetInfo 资源信息
 * @returns 资源文件路径
 * @description 处理css文件和其他静态资源的输出路径
 */
const createAssetFileName = (assetInfo: AssetInfo): string => {
  // 判断是静态资源且是css
  if (assetInfo.type === "asset" && /\.(css)$/i.test(assetInfo.name || "")) {
    // 截取出css打包名称中的组件名 button.vue_vue_type_style_index_0_lang.css 截出button
    const str = (assetInfo.name || "style.").split(".")[0];
    // 将组件css输出到组件目录下 组件/组件.css
    return `${str}.css`;
  }
  // 其他静态资源则返回默认的 后续也可以对其他资源文件细分
  return "assets/[name].[ext]";
};

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
  // 处理静态资源文件名
  assetFileNames: createAssetFileName
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
