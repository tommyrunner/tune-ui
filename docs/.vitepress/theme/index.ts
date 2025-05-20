import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h } from "vue";
import "./styles/vars.css";
import "./styles/custom.css";
import "./styles/demo.css";
// 引入 tune-ui 组件库 样式文件
import "tune-ui/dist/lib/style.css";
// 导入自定义的VSCode风格样式
import "./styles/code.css";
// @ts-ignore
import Demo from "./components/Demo.vue";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {});
  },
  enhanceApp({ app }) {
    // 注册组件
    app.component("Demo", Demo);
  }
} as Theme;
