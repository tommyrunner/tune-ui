import { App } from "vue";
import { TButton } from "./button";

// 单独引入
export const components = { TButton };
// 全局注册
export default {
  version: "1.0.0",
  install: (Vue: App) => {
    // 全部注册
    for (const comp of Object.values(components)) {
      if (comp.name) Vue.component(comp.name, comp);
    }
  },
};
