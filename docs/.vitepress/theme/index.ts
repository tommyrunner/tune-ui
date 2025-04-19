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
  enhanceApp({ app, router }) {
    // 注册组件
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

    // 页面跳转回到顶部
    if (typeof window !== "undefined") {
      router.onAfterRouteChanged = () => {
        window.scrollTo(0, 0);
      };
    }

    // 注册暗色模式切换组件
    app.component("DarkModeSwitch", {
      setup() {
        if (typeof window === "undefined") return {};

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

        return { isDark };
      },
      template: `<div style="display:none;"></div>`
    });
  }
} as Theme;
