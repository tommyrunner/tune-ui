import type { App } from "vue";
import ButtonTest from "./button.vue";
import InputTest from "./input.vue";
import TextareaTest from "./textarea.vue";
import BackTopTest from "./back-top.vue";
import BadgeTest from "./badge.vue";
import BreadcrumbTest from "./breadcrumb.vue";
import CardTest from "./card.vue";
import CarouselTest from "./carousel.vue";
import CheckboxTest from "./checkbox.vue";
import TestHome from "./home.vue";
import CollapseTest from "./collapse.vue";
import DialogTest from "./dialog.vue";
import DrawerTest from "./drawer.vue";
import FlexTest from "./flex.vue";
import IconTest from "./icon.vue";

/** 测试组件列表 */
export const testComponents = {
  ButtonTest,
  InputTest,
  TextareaTest,
  BackTopTest,
  BadgeTest,
  BreadcrumbTest,
  CardTest,
  CarouselTest,
  CheckboxTest,
  TestHome,
  CollapseTest,
  DialogTest,
  DrawerTest,
  FlexTest,
  IconTest
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
export const TCarouselTest = CarouselTest;
export const TCheckboxTest = CheckboxTest;
export const TTestHome = TestHome;
export const TCollapseTest = CollapseTest;
export const TDialogTest = DialogTest;
export const TDrawerTest = DrawerTest;
export const TFlexTest = FlexTest;
export const TIconTest = IconTest;
// 默认导出安装器
export default installTestComponents;
