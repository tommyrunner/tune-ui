import type { App } from "vue";
import ButtonTest from "./packages/button.vue";
import InputTest from "./packages/input.vue";
import TextareaTest from "./packages/textarea.vue";
import BackTopTest from "./packages/back-top.vue";
import BadgeTest from "./packages/badge.vue";
import BreadcrumbTest from "./packages/breadcrumb.vue";
import CardTest from "./packages/card.vue";
import CarouselTest from "./packages/carousel.vue";
import CheckboxTest from "./packages/checkbox.vue";
import CollapseTest from "./packages/collapse.vue";
import DialogTest from "./packages/dialog.vue";
import DrawerTest from "./packages/drawer.vue";
import FlexTest from "./packages/flex.vue";
import IconTest from "./packages/icon.vue";
import InputNumberTest from "./packages/input-number.vue";
import MessageTest from "./packages/message.vue";
import PopoverTest from "./packages/popover.vue";
import PopConfirmTest from "./packages/pop-confirm.vue";
import RadioTest from "./packages/radio.vue";
import RateTest from "./packages/rate.vue";
import SwitchTest from "./packages/switch.vue";
import TabsTest from "./packages/tabs.vue";
import ListViewTest from "./packages/list-view.vue";
import ScrollbarTest from "./packages/scrollbar.vue";
import TableTest from "./packages/table.vue";
import SelectTest from "./packages/select.vue";
import TagTest from "./packages/tag.vue";
import CalendarTest from "./packages/calendar.vue";
import DatePickerTest from "./packages/date-picker.vue";
import DatePickerMultipleTest from "./packages/date-picker-multiple.vue";
import ColorPickerTest from "./packages/color-picker.vue";
import SliderTest from "./packages/slider.vue";
import ProgressTest from "./packages/progress.vue";
import ImageTest from "./packages/image.vue";
import UploadTest from "./packages/upload.vue";

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
  CollapseTest,
  DialogTest,
  DrawerTest,
  FlexTest,
  IconTest,
  InputNumberTest,
  MessageTest,
  PopoverTest,
  PopConfirmTest,
  RadioTest,
  RateTest,
  SwitchTest,
  TabsTest,
  ListViewTest,
  ScrollbarTest,
  TableTest,
  SelectTest,
  TagTest,
  CalendarTest,
  DatePickerTest,
  DatePickerMultipleTest,
  ColorPickerTest,
  SliderTest,
  ProgressTest,
  ImageTest,
  UploadTest
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
export const TCollapseTest = CollapseTest;
export const TDialogTest = DialogTest;
export const TDrawerTest = DrawerTest;
export const TFlexTest = FlexTest;
export const TIconTest = IconTest;
export const TInputNumberTest = InputNumberTest;
export const TMessageTest = MessageTest;
export const TPopoverTest = PopoverTest;
export const TPopConfirmTest = PopConfirmTest;
export const TRadioTest = RadioTest;
export const TRateTest = RateTest;
export const TSwitchTest = SwitchTest;
export const TTabsTest = TabsTest;
export const TListViewTest = ListViewTest;
export const TScrollbarTest = ScrollbarTest;
export const TTableTest = TableTest;
export const TSelectTest = SelectTest;
export const TTagTest = TagTest;
export const TCalendarTest = CalendarTest;
export const TDatePickerTest = DatePickerTest;
export const TDatePickerMultipleTest = DatePickerMultipleTest;
export const TColorPickerTest = ColorPickerTest;
export const TSliderTest = SliderTest;
export const TProgressTest = ProgressTest;
export const TImageTest = ImageTest;
export const TUploadTest = UploadTest;
// 默认导出安装器
export default installTestComponents;
