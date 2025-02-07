import type { App } from "vue";
import ButtonTest from "./button.vue";
import InputTest from "./input.vue";
import TextareaTest from "./textarea.vue";

/** 测试组件列表 */
export const testComponents = {
  ButtonTest,
  InputTest,
  TextareaTest
};

/** 测试组件安装器 */
export const installTestComponents = (app: App) => {
  for (const [name, component] of Object.entries(testComponents)) {
    app.component(name, component);
  }
};

// 导出各个测试组件
export const TButtonTest = ButtonTest;
export const TInputTest = InputTest;
export const TTextareaTest = TextareaTest;

// 默认导出安装器
export default installTestComponents;
