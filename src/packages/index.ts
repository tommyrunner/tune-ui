import { App } from "vue";

// 基础组件
import { TButton } from "./button";
import { TIcon } from "./icon";
import { TDivider } from "./divider";

// 表单组件
import { TInput } from "./input";
import { TInputNumber } from "./input-number";
import { TTextarea } from "./textarea";
import { TRadio, TRadioGroup } from "./radio";
import { TCheckbox, TCheckboxGroup } from "./checkbox";
import { TSwitch } from "./switch";
import { TRate } from "./rate";
import { TSelect } from "./select";
import { TDatePicker } from "./date-picker";
import { TDatePickerMultiple } from "./date-picker-multiple";
import { TSlider } from "./slider";
import { TUpload } from "./upload";
import { TForm, TFormItem } from "./form";

// 数据展示组件
import { TBadge } from "./badge";
import { TCard } from "./card";
import { TCarousel, TCarouselGroup } from "./carousel";
import { TCollapse, TCollapseGroup } from "./collapse";
import { TListView, TListViewItem } from "./list-view";
import { TScrollbar } from "./scrollbar";
import { TTable, TTableRow } from "./table";
import { TProgress } from "./progress";
import { TImage } from "./image";
import { TTree } from "./tree";

// 反馈组件
import { Message, Notification } from "./message";
import { TDialog } from "./dialog";
import { TDrawer } from "./drawer";
import { TPopover } from "./popover";
import { TPopConfirm } from "./pop-confirm";

// 导航组件
import { TBreadcrumb } from "./breadcrumb";
import { TBackTop } from "./back-top";
import { TTabs, TTabsGroup } from "./tabs";

// 布局组件
import { TFlex, TFlexGroup } from "./flex";
import { TWatermark } from "./watermark";

// 菜单组件
import { TMenu } from "./menu";

/**
 * 组件集合
 */
const components = {
  // 基础组件
  TButton,
  TIcon,
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
  TRate,
  TSelect,
  TDatePicker,
  TDatePickerMultiple,
  TSlider,
  TUpload,
  TForm,
  TFormItem,

  // 数据展示组件
  TBadge,
  TCard,
  TCarousel,
  TCarouselGroup,
  TCollapse,
  TCollapseGroup,
  TListView,
  TListViewItem,
  TScrollbar,
  TTable,
  TTableRow,
  TProgress,
  TImage,
  TTree,

  // 反馈组件
  Message,
  Notification,
  TDialog,
  TDrawer,
  TPopover,
  TPopConfirm,

  // 导航组件
  TBreadcrumb,
  TBackTop,
  TTabs,
  TTabsGroup,

  // 布局组件
  TFlex,
  TFlexGroup,
  TWatermark,

  // 菜单组件
  TMenu
};

/**
 * TUI组件库全局注册
 */
export default {
  version: "1.0.0",
  install: (Vue: App) => {
    Object.entries(components).forEach(([_, component]) => {
      if (component.name) {
        Vue.component(component.name, component);
      }
    });

    // 添加全局方法
    Vue.config.globalProperties.$message = Message;
    Vue.config.globalProperties.$notification = Notification;
  }
};

// 导出所有组件类型

// 基础组件
export * from "./button";
export * from "./icon";
export * from "./divider";

// 表单组件
export * from "./input";
export * from "./input-number";
export * from "./textarea";
export * from "./radio";
export * from "./checkbox";
export * from "./switch";
export * from "./rate";
export * from "./select";
export * from "./date-picker";
export * from "./date-picker-multiple";
export * from "./slider";
export * from "./upload";
export * from "./form";

// 数据展示组件
export * from "./badge";
export * from "./card";
export * from "./carousel";
export * from "./collapse";
export * from "./list-view";
export * from "./scrollbar";
export * from "./table";
export * from "./progress";
export * from "./image";
export * from "./tree";

// 反馈组件
export * from "./message";
export * from "./dialog";
export * from "./drawer";
export * from "./popover";
export * from "./pop-confirm";

// 导航组件
export * from "./breadcrumb";
export * from "./back-top";
export * from "./tabs";
export * from "./menu";

// 布局组件
export * from "./flex";
export * from "./watermark";
