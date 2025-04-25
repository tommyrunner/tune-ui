import { App } from "vue";
import { vLoading } from "./vLoading";

/** 安装全部指令 */
export const install = {
  install: (app: App) => {
    app.directive("loading", vLoading);
  }
};

export default install;
