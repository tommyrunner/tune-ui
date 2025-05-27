// 类型导入
import type { App } from "vue";

// 基础组件
import { TButton } from "./button";
import { TIcon } from "./icon";
import { TTag } from "./tag";
import { TDivider } from "./divider";

// 表单组件
import { TInput } from "./input";
import { TInputNumber } from "./input-number";
import { TTextarea } from "./textarea";
import { TRadio, TRadioGroup } from "./radio";
import { TCheckbox, TCheckboxGroup } from "./checkbox";
import { TSwitch } from "./switch";
import { TSelect } from "./select";
import { TRate } from "./rate";
import { TSlider } from "./slider";
import { TDatePicker } from "./date-picker";
import { TDatePickerMultiple } from "./date-picker-multiple";
import { TUpload } from "./upload";
import { TColorPicker } from "./color-picker";
import { TForm, TFormItem } from "./form";

// 数据展示组件
import { TBadge } from "./badge";
import { TCard } from "./card";
import { TCarousel, TCarouselGroup } from "./carousel";
import { TListView, TListViewItem } from "./list-view";
import { TTable, TTableRow } from "./table";
import { TProgress } from "./progress";
import { TImage } from "./image";
import { TCalendar } from "./calendar";
import { TScrollbar } from "./scrollbar";

// 导航组件
import { TBreadcrumb } from "./breadcrumb";
import { TBackTop } from "./back-top";
import { TTabs, TTabsGroup } from "./tabs";
import { TTree } from "./tree";
import { TCollapse, TCollapseGroup } from "./collapse";

// 反馈组件
import { TDialog } from "./dialog";
import { TDrawer } from "./drawer";
import { TPopConfirm } from "./pop-confirm";
import { Message, Notification } from "./message";
import { TPopover } from "./popover";

// 布局组件
import { TFlex, TFlexGroup } from "./flex";

// 其他组件
import { TWatermark } from "./watermark";
import { TMenu } from "./menu";

// 版本号
import { version } from "../../package.json";

/** ----------------------------------------------------- */
// 基础组件
export * from "./button";
export * from "./icon";
export * from "./tag";
export * from "./divider";

// 表单组件
export * from "./input";
export * from "./input-number";
export * from "./textarea";
export * from "./radio";
export * from "./checkbox";
export * from "./switch";
export * from "./select";
export * from "./rate";
export * from "./slider";
export * from "./date-picker";
export * from "./date-picker-multiple";
export * from "./upload";
export * from "./color-picker";
export * from "./form";

// 数据展示组件
export * from "./badge";
export * from "./card";
export * from "./carousel";
export * from "./list-view";
export * from "./table";
export * from "./progress";
export * from "./image";
export * from "./calendar";
export * from "./scrollbar";

// 导航组件
export * from "./breadcrumb";
export * from "./back-top";
export * from "./tabs";
export * from "./tree";
export * from "./collapse";

// 反馈组件
export * from "./dialog";
export * from "./drawer";
export * from "./pop-confirm";
export * from "./message";
export * from "./popover";

// 布局组件
export * from "./flex";

// 其他组件
export * from "./watermark";
export * from "./menu";

/**
 * 全局注册
 */
const components = {
  // 基础组件
  TButton,
  TIcon,
  TTag,
  TDivider,

  // 表单组件
  TInput,
  TInputNumber,
  TTextarea,
  TRadio,
  TRadioGroup,
  TCheckbox,
  TCheckboxGroup,
  TSwitch,
  TSelect,
  TRate,
  TSlider,
  TDatePicker,
  TDatePickerMultiple,
  TUpload,
  TColorPicker,
  TForm,
  TFormItem,

  // 数据展示组件
  TBadge,
  TCard,
  TCarousel,
  TCarouselGroup,
  TListView,
  TListViewItem,
  TTable,
  TTableRow,
  TProgress,
  TImage,
  TCalendar,
  TScrollbar,

  // 导航组件
  TBreadcrumb,
  TBackTop,
  TTabs,
  TTabsGroup,
  TTree,
  TCollapse,
  TCollapseGroup,

  // 反馈组件
  TDialog,
  TDrawer,
  TPopConfirm,
  Message,
  Notification,
  TPopover,

  // 布局组件
  TFlex,
  TFlexGroup,

  // 其他组件
  TWatermark,
  TMenu
};

export const install = {
  version,
  install: (Vue: App) => {
    Object.entries(components).forEach(([_, component]) => {
      if (component.name) {
        Vue.component(component.name, component);
      }
    });

    // 添加全局方法
    Vue.config.globalProperties.$message = components.Message;
    Vue.config.globalProperties.$notification = components.Notification;
  }
};
export default install;
