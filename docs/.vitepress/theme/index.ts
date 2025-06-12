import DefaultTheme from "vitepress/theme";
import { type Theme } from "vitepress";
import { h } from "vue";
import "./styles/vars.css";
import "./styles/custom.css";
import "./styles/demo.css";
// 引入 tune-ui 组件库 样式文件
import "tune-ui/style.css";
// 导入自定义的VSCode风格样式
import "./styles/code.css";
import Demo from "./components/Demo.vue";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {});
  },
  async enhanceApp({ app, router }) {
    // 注册Demo组件
    app.component("Demo", Demo);

    // 只在客户端环境中加载并注册tune-ui组件库
    if (!import.meta.env.SSR) {
      try {
        // 动态导入tune-ui组件库
        const tuneUi: any = await import("tune-ui");
        // 使用类型断言处理类型问题
        app.use(tuneUi.install);
        // 注册指令
        app.use(tuneUi.directive);
        // 处理国际化切换
        router.onBeforePageLoad = to => {
          const { setLocale } = tuneUi.useOptions();
          if (to.includes("/en/")) {
            setLocale("en-US");
          } else {
            setLocale("zh-CN");
          }
        };
        // 注册全局方法(模拟按需引入组件)
        window.TMessage = tuneUi.TMessage;
        window.TNotification = tuneUi.TNotification;
      } catch (error) {
        console.error("加载组件库失败:", error);
      }
    }
  }
} satisfies Theme;
