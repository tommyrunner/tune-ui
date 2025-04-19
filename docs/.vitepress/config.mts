import { defineConfig } from "vitepress";
import { resolve } from "path";
import demoBlockPlugin from "./plugins/demoBlock";
import componentsSidebar from "./sidebar/components.json";
import guideSidebar from "./sidebar/guide.json";

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
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "https://i.postimg.cc/PxMBWVPz/logo.png",
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      { text: "组件", link: "/components/" },
      {
        text: "相关链接",
        items: [
          { text: "Github", link: "https://github.com/yourusername/tune-ui" },
          { text: "NPM", link: "https://www.npmjs.com/package/tune-ui" }
        ]
      }
    ],

    sidebar: {
      "/guide/": guideSidebar,
      "/components/": componentsSidebar
    },

    socialLinks: [{ icon: "github", link: "https://github.com/yourusername/tune-ui" }],

    footer: {
      message: "基于MIT许可发布",
      copyright: "Copyright © 2023-present Tune UI Team"
    },

    docFooter: {
      prev: "上一页",
      next: "下一页"
    },

    outline: {
      label: "页面导航"
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium"
      }
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "返回顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式"
  }
});
