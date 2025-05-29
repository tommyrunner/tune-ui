import { defineConfig } from "vitepress";
import { resolve } from "path";
import fs from "fs";
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

  // 启用本地搜索功能
  themeConfig: {
    search: {
      provider: "local"
    }
  },

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
      include: ["vue", "vue-router"],
      exclude: ["tune-ui"]
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

    // 确保tune-ui只在客户端加载，不在SSR阶段处理
    ssr: {
      external: ["tune-ui"]
    }
  },

  // 构建后钩子：复制examples目录到dist
  buildEnd() {
    // 默认的VitePress输出目录是 docs/.vitepress/dist
    const distDir = resolve(__dirname, "dist");
    const examplesSourceDir = resolve(__dirname, "../examples");
    const examplesTargetDir = resolve(distDir, "examples");
    const examplesSourceDirEn = resolve(__dirname, "../examples/en");
    const examplesTargetDirEn = resolve(distDir, "en/examples");

    // 确保examples目标目录存在
    if (!fs.existsSync(examplesTargetDir)) {
      fs.mkdirSync(examplesTargetDir, { recursive: true });
    }

    // 复制examples目录到dist/examples
    copyDirectorySync(examplesSourceDir, examplesTargetDir);
    // 复制examples目录到dist/en/examples
    copyDirectorySync(examplesSourceDirEn, examplesTargetDirEn);
    console.log("✓ Examples目录已复制到[dist/examples]和[dist/en/examples]");
  },

  // 国际化配置
  locales
});

/**
 * 递归复制目录及其内容
 * @param source 源目录
 * @param target 目标目录
 */
function copyDirectorySync(source, target) {
  // 如果目标目录不存在则创建
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // 读取源目录内容
  const files = fs.readdirSync(source, { withFileTypes: true });

  // 复制每个文件/目录
  for (const file of files) {
    const sourcePath = resolve(source, file.name);
    const targetPath = resolve(target, file.name);

    if (file.isDirectory()) {
      // 递归复制子目录
      copyDirectorySync(sourcePath, targetPath);
    } else {
      // 复制文件
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}
