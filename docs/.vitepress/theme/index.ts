import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h } from "vue";
import "./styles/vars.css";
import "./styles/custom.css";
import "./styles/demo.css";
// 引入 tune-ui 组件库 样式文件
import "tune-ui/dist/lib/style.css";

// @ts-ignore
import Demo from "./components/Demo.vue";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 可以在这里自定义布局
    });
  },
  enhanceApp({ app, router }) {
    // 注册演示组件
    app.component("Demo", Demo);
    // 注册UI模拟组件
    app.component("TButton", {
      props: ["type", "plain", "round", "circle", "loading", "disabled", "icon", "size", "color"],
      template: `<button class="t-button" :class="{
                  't-button--' + type: type,
                  't-button--plain': plain,
                  't-button--round': round,
                  't-button--circle': circle,
                  't-button--loading': loading,
                  't-button--disabled': disabled
                }">
                  <i v-if="icon" :class="'t-icon-' + icon"></i>
                  <slot></slot>
                </button>`
    });

    app.component("TButtonGroup", {
      template: `<div class="t-button-group"><slot></slot></div>`
    });

    app.component("TIcon", {
      props: ["icon"],
      template: `<i :class="'t-icon-' + icon"></i>`
    });

    // 页面跳转回到顶部
    if (typeof window !== "undefined") {
      router.onAfterRouteChanged = () => {
        window.scrollTo(0, 0);
      };
    }

    // 注册暗色模式切换组件（正确使用useData）
    app.component("DarkModeSwitch", {
      setup() {
        // 这里是正确的使用useData的地方 - 在组件setup函数内
        if (typeof window === "undefined") return {};

        // 以下代码只在浏览器环境执行
        const { watch, onMounted, ref } = require("vue");
        const { useData } = require("vitepress");
        const { isDark } = useData();

        onMounted(() => {
          updateClass();
          watch(isDark, updateClass, { immediate: true });
        });

        function updateClass(value = isDark.value) {
          const className = "dark";
          const element = window.document.documentElement;

          if (value) {
            element.classList.add(className);
          } else {
            element.classList.remove(className);
          }
        }

        return {
          isDark
        };
      },
      template: `<div style="display:none;"></div>`
    });
  }
} as Theme;
