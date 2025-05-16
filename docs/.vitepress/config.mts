import { defineConfig } from "vitepress";
import { resolve } from "path";
import demoBlockPlugin from "./plugins/demoBlock";
import locales from "./config/locales";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tune UI",
  description: "现代化Vue3 UI组件库，提高开发效率",
  head: [["link", { rel: "icon", href: "https://i.postimg.cc/PxMBWVPz/logo.png" }]],
  markdown: {
    // 代码块行数显示
    lineNumbers: true,
    // 使用自定义容器
    config: md => {
      demoBlockPlugin(md);
    }
  },
  // 增加Vite配置，支持?raw后缀和处理Vue文件
  vite: {
    resolve: {
      alias: {
        "@examples": resolve(__dirname, "../examples")
      }
    },
    optimizeDeps: {
      // 确保示例组件和相关依赖被正确处理
      include: ["vue", "vue-router"],
      exclude: ["tune-ui"]
    },
    server: {
      fs: {
        // 允许访问上层目录中的示例文件
        allow: [".."]
      }
    },
    // 防止警告
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === "UNRESOLVED_IMPORT") return;
          warn(warning);
        }
      }
    }
  },
  locales
});
