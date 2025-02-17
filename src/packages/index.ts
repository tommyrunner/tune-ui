import { App } from "vue";
import { TButton } from "./button";
import { TIcon } from "./icon";
import { TFlex, TFlexGroup } from "./flex";
import { TRadio, TRadioGroup } from "./radio";
import { TCheckbox, TCheckboxGroup } from "./checkbox";
import { TSwitch } from "./switch";
import { TInput } from "./input";
import { TSelect } from "./select";
import { TInputNumber } from "./input-number";
import { TTextarea } from "./textarea";
import { TRate } from "./rate";
import { TBadge } from "./badge";
import { TCard } from "./card";
import { TCollapse, TCollapseGroup } from "./collapse";
import { TCarousel, TCarouselGroup } from "./carousel";
import { TPopover } from "./popover";
import { TPopConfirm } from "./popConfirm";
import { TDialog } from "./dialog";
import { TDrawer } from "./drawer";
import { Message, Notification } from "./message";
import { TBreadcrumb } from "./breadcrumb";
import { TBackTop } from "./back-top";
import { TTabs, TTabsGroup } from "./tabs";
import { TListView, TListViewItem } from "./listView";
import { TScrollbar } from "./scrollbar";
import { TTable, TTableRow } from "./table";

const components = {
  TButton,
  TIcon,
  TFlex,
  TFlexGroup,
  TRadio,
  TCheckbox,
  TRadioGroup,
  TCheckboxGroup,
  TSwitch,
  TInput,
  TSelect,
  TInputNumber,
  TTextarea,
  TRate,
  TBadge,
  TCard,
  TCollapse,
  TCollapseGroup,
  TCarousel,
  TCarouselGroup,
  TPopover,
  TPopConfirm,
  TDialog,
  TDrawer,
  Message,
  Notification,
  TBreadcrumb,
  TBackTop,
  TTabs,
  TTabsGroup,
  TListView,
  TListViewItem,
  TScrollbar,
  TTable,
  TTableRow
};
// 全局组件注册
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
export * from "./button";
export * from "./icon";
export * from "./flex";
export * from "./radio";
export * from "./checkbox";
export * from "./switch";
export * from "./input";
export * from "./select";
export * from "./input-number";
export * from "./textarea";
export * from "./rate";
export * from "./badge";
export * from "./card";
export * from "./collapse";
export * from "./carousel";
export * from "./popover";
export * from "./popConfirm";
export * from "./dialog";
export * from "./drawer";
export * from "./message";
export * from "./breadcrumb";
export * from "./back-top";
export * from "./tabs";
export * from "./listView";
export * from "./scrollbar";
export * from "./table";
