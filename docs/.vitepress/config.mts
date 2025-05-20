import { defineConfig } from "vitepress";
import { resolve } from "path";
import locales from "./config/locales";

/**
 * VitePress 配置文件
 * @description 配置文档站点的基本信息和构建选项
 * @see https://vitepress.dev/reference/site-config
 */
export default defineConfig({
  // 站点基本信息
  title: "Tune UI",
  base: "/tune-ui/",
  description: "现代化Vue3 UI组件库，提高开发效率",
  head: [["link", { rel: "icon", href: "https://i.postimg.cc/PxMBWVPz/logo.png" }]],

  // Vite 构建配置
  vite: {
    // 路径别名配置
    resolve: {
      dedupe: ["vue"],
      alias: {
        "@examples": resolve(__dirname, "../examples")
      }
    },

    // 依赖优化配置
    optimizeDeps: {
      include: ["vue", "vue-router"]
    },

    // 开发服务器配置
    server: {
      fs: {
        allow: [".."] // 允许访问上层目录文件
      }
    },

    // 构建优化配置
    build: {
      commonjsOptions: {
        include: [/src\/packages/, /node_modules/]
      },
      rollupOptions: {
        onwarn(warning, warn) {
          // 忽略未解析导入警告
          if (warning.code === "UNRESOLVED_IMPORT") return;
          warn(warning);
        }
      }
    },

    // 禁用ssr外部化，防止组件被跳过处理
    ssr: {
      noExternal: ["tune-ui"]
    }
  },

  // 国际化配置
  locales
});
