import type { DefaultTheme } from "vitepress";

export default {
  zh: [
    { text: "首页", link: "/" },
    { text: "指南", link: "/guide/" },
    { text: "组件", link: "/components/" },
    {
      text: "相关链接",
      items: [
        { text: "Github", link: "https://github.com/yourusername/tune-ui" },
        { text: "NPM", link: "https://www.npmjs.com/package/tune-ui" },
        { text: "WebLoading", link: "https://tommyrunner.github.io/web-loading/" }
      ]
    }
  ],
  en: [
    { text: "Home", link: "/en/" },
    { text: "Guide", link: "/en/guide/" },
    { text: "Components", link: "/en/components/" },
    {
      text: "Links",
      items: [
        { text: "Github", link: "https://github.com/yourusername/tune-ui" },
        { text: "NPM", link: "https://www.npmjs.com/package/tune-ui" },
        { text: "WebLoading", link: "https://tommyrunner.github.io/web-loading/" }
      ]
    }
  ]
} as { zh: DefaultTheme.NavItem[]; en: DefaultTheme.NavItem[] };
