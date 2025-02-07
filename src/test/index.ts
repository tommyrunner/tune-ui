import type { App } from "vue";
import ButtonTest from "./button.vue";
import InputTest from "./input.vue";
import TextareaTest from "./textarea.vue";
import BackTopTest from "./back-top.vue";
import BadgeTest from "./badge.vue";
import BreadcrumbTest from "./breadcrumb.vue";
import CardTest from "./card.vue";

/** 测试组件列表 */
export const testComponents = {
  ButtonTest,
  InputTest,
  TextareaTest,
  BackTopTest,
  BadgeTest,
  BreadcrumbTest,
  CardTest
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
export const TBackTopTest = BackTopTest;
export const TBadgeTest = BadgeTest;
export const TBreadcrumbTest = BreadcrumbTest;
export const TCardTest = CardTest;
// 默认导出安装器
export default installTestComponents;
