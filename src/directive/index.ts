import { App } from "vue";
import { vLoading } from "./vLoading";
/** 安装全部指令 */
export const directive = {
  install: (app: App) => {
    app.directive("loading", vLoading);
  }
};

export default directive;

export { vLoading };
export * from "web-loading";
