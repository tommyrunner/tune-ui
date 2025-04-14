import type { App } from "vue";

// 基础组件测试
import ButtonTest from "./packages/button.vue";
import IconTest from "./packages/icon.vue";
import DividerTest from "./packages/divider.vue";
import TagTest from "./packages/tag.vue";
import LoadingTest from "./packages/loading.vue";

// 表单组件测试
import InputTest from "./packages/input.vue";
import InputNumberTest from "./packages/input-number.vue";
import TextareaTest from "./packages/textarea.vue";
import RadioTest from "./packages/radio.vue";
import CheckboxTest from "./packages/checkbox.vue";
import SwitchTest from "./packages/switch.vue";
import RateTest from "./packages/rate.vue";
import SelectTest from "./packages/select.vue";
import DatePickerTest from "./packages/date-picker.vue";
import DatePickerMultipleTest from "./packages/date-picker-multiple.vue";
import ColorPickerTest from "./packages/color-picker.vue";
import SliderTest from "./packages/slider.vue";
import UploadTest from "./packages/upload.vue";
import FormTest from "./packages/form.vue";

// 数据展示组件测试
import BadgeTest from "./packages/badge.vue";
import CardTest from "./packages/card.vue";
import CarouselTest from "./packages/carousel.vue";
import CollapseTest from "./packages/collapse.vue";
import ListViewTest from "./packages/list-view.vue";
import ScrollbarTest from "./packages/scrollbar.vue";
import TableTest from "./packages/table.vue";
import ProgressTest from "./packages/progress.vue";
import ImageTest from "./packages/image.vue";
import TreeTest from "./packages/tree.vue";

// 反馈组件测试
import MessageTest from "./packages/message.vue";
import DialogTest from "./packages/dialog.vue";
import DrawerTest from "./packages/drawer.vue";
import PopoverTest from "./packages/popover.vue";
import PopConfirmTest from "./packages/pop-confirm.vue";

// 导航组件测试
import BreadcrumbTest from "./packages/breadcrumb.vue";
import BackTopTest from "./packages/back-top.vue";
import TabsTest from "./packages/tabs.vue";
import MenuTest from "./packages/menu.vue";

// 布局组件测试
import FlexTest from "./packages/flex.vue";
import CalendarTest from "./packages/calendar.vue";
import WatermarkTest from "./packages/watermark.vue";

/** 测试组件列表 */
export const testComponents = {
  // 基础组件测试
  ButtonTest,
  IconTest,
  DividerTest,
  TagTest,
  LoadingTest,

  // 表单组件测试
  InputTest,
  InputNumberTest,
  TextareaTest,
  RadioTest,
  CheckboxTest,
  SwitchTest,
  RateTest,
  SelectTest,
  DatePickerTest,
  DatePickerMultipleTest,
  ColorPickerTest,
  SliderTest,
  UploadTest,
  FormTest,

  // 数据展示组件测试
  BadgeTest,
  CardTest,
  CarouselTest,
  CollapseTest,
  ListViewTest,
  ScrollbarTest,
  TableTest,
  ProgressTest,
  ImageTest,
  TreeTest,

  // 反馈组件测试
  MessageTest,
  DialogTest,
  DrawerTest,
  PopoverTest,
  PopConfirmTest,

  // 导航组件测试
  BreadcrumbTest,
  BackTopTest,
  TabsTest,
  MenuTest,

  // 布局组件测试
  FlexTest,
  CalendarTest,
  WatermarkTest
};

/** 测试组件安装器 */
export const installTestComponents = (app: App) => {
  for (const [name, component] of Object.entries(testComponents)) {
    app.component(name, component);
  }
};

// 导出各个测试组件

// 基础组件测试
export const TButtonTest = ButtonTest;
export const TIconTest = IconTest;
export const TDividerTest = DividerTest;
export const TTagTest = TagTest;
export const TLoadingTest = LoadingTest;

// 表单组件测试
export const TInputTest = InputTest;
export const TInputNumberTest = InputNumberTest;
export const TTextareaTest = TextareaTest;
export const TRadioTest = RadioTest;
export const TCheckboxTest = CheckboxTest;
export const TSwitchTest = SwitchTest;
export const TRateTest = RateTest;
export const TSelectTest = SelectTest;
export const TDatePickerTest = DatePickerTest;
export const TDatePickerMultipleTest = DatePickerMultipleTest;
export const TColorPickerTest = ColorPickerTest;
export const TSliderTest = SliderTest;
export const TUploadTest = UploadTest;
export const TFormTest = FormTest;

// 数据展示组件测试
export const TBadgeTest = BadgeTest;
export const TCardTest = CardTest;
export const TCarouselTest = CarouselTest;
export const TCollapseTest = CollapseTest;
export const TListViewTest = ListViewTest;
export const TScrollbarTest = ScrollbarTest;
export const TTableTest = TableTest;
export const TProgressTest = ProgressTest;
export const TImageTest = ImageTest;
export const TTreeTest = TreeTest;

// 反馈组件测试
export const TMessageTest = MessageTest;
export const TDialogTest = DialogTest;
export const TDrawerTest = DrawerTest;
export const TPopoverTest = PopoverTest;
export const TPopConfirmTest = PopConfirmTest;

// 导航组件测试
export const TBreadcrumbTest = BreadcrumbTest;
export const TBackTopTest = BackTopTest;
export const TTabsTest = TabsTest;
export const TMenuTest = MenuTest;

// 布局组件测试
export const TFlexTest = FlexTest;
export const TCalendarTest = CalendarTest;
export const TWatermarkTest = WatermarkTest;

// 默认导出安装器
export default installTestComponents;
