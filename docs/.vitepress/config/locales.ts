import type { LocaleConfig, DefaultTheme } from "vitepress";
import nav from "./nav";
import sidebar from "./sidebar";

export default {
  root: {
    lang: "zh-CN",
    label: "中文",
    themeConfig: {
      logo: "https://i.postimg.cc/PxMBWVPz/logo.png",
      nav: nav.zh,
      sidebar: sidebar.zh,
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
          dateStyle: "full" as const,
          timeStyle: "medium" as const
        }
      },
      langMenuLabel: "多语言",
      returnToTopLabel: "返回顶部",
      sidebarMenuLabel: "菜单",
      darkModeSwitchLabel: "主题",
      lightModeSwitchTitle: "切换到浅色模式",
      darkModeSwitchTitle: "切换到深色模式"
    }
  },
  en: {
    lang: "en-US",
    label: "English",
    themeConfig: {
      logo: "https://i.postimg.cc/PxMBWVPz/logo.png",
      nav: nav.en,
      sidebar: sidebar.en,
      socialLinks: [{ icon: "github", link: "https://github.com/yourusername/tune-ui" }],
      footer: {
        message: "Released under the MIT License",
        copyright: "Copyright © 2023-present Tune UI Team"
      },
      docFooter: {
        prev: "Previous",
        next: "Next"
      },
      outline: {
        label: "On this page"
      },
      lastUpdated: {
        text: "Last updated",
        formatOptions: {
          dateStyle: "full" as const,
          timeStyle: "medium" as const
        }
      },
      langMenuLabel: "Language",
      returnToTopLabel: "Return to top",
      sidebarMenuLabel: "Menu",
      darkModeSwitchLabel: "Theme",
      lightModeSwitchTitle: "Switch to light theme",
      darkModeSwitchTitle: "Switch to dark theme"
    }
  }
} as LocaleConfig<DefaultTheme.Config>;
