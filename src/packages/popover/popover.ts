import type { Ref, RendererElement } from "vue";

/** 全局三角箭头宽度(半径) */
export const triangleWidth = 8;

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 弹出框宽度 */
  width?: string | number;

  /** 是否禁用 */
  disabled?: boolean;

  /** 触发方式 */
  type?: "hover" | "click" | "none";

  /** 显示内容 */
  content?: string;

  /** 圆角大小 */
  radius?: [number, number, number, number] | number;

  /** 内边距大小 */
  padding?: [number, number, number, number] | number;

  /** 阴影配置 */
  boxShadow?: [number, number, number, string];

  /** 弹出框与触发元素的间距 */
  gap?: number;

  /** 隐藏延迟时间(毫秒) */
  hideAfter?: number;

  /** 弹出位置 */
  position?: "top" | "right" | "bottom" | "left";

  /** 渲染的目标位置 */
  appendTo?: string | RendererElement;

  /** 是否自动调整位置 */
  autoPosition?: boolean;

  /** 是否显示箭头 */
  showArrow?: boolean;

  /** 自定义位置坐标 */
  custom?: {
    x: number;
    y: number;
  };

  /** 是否使用对话框动画 */
  dialogAnimation?: boolean;

  /** 是否使用抽屉动画 */
  drawerAnimation?: boolean;

  /** 是否支持ESC键关闭 */
  closeOnPressEscape?: boolean;

  /** 是否点击其他区域关闭 */
  closeOnPressOther?: boolean;

  /** 是否显示遮罩层(控制遮罩层不能滚动) */
  isModal?: boolean;

  /** 是否允许遮罩层嵌套 */
  isModalNest?: boolean;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 点击遮罩层事件 */
  clickModel: [];

  /** hover进入事件 */
  hoverEnter: [el: HTMLElement];

  /** hover离开事件 */
  hoverOut: [el: HTMLElement];

  /** 显示状态改变事件 */
  modelChange: [];

  /** 打开事件 */
  open: [];

  /** 关闭事件 */
  close: [];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 触发元素内容 */
  default?: () => any;

  /** 内容插槽 - 弹出框内容 */
  content?: () => any;
}

/**
 * @description 组件暴露方法类型定义
 * @interface ExposesType
 */
export interface ExposesType {
  /** 弹出框实例 */
  popoverRef: Ref<HTMLDivElement>;

  /** 显示弹出框 */
  showPopover: () => void;

  /** 隐藏弹出框 */
  hidePopover: (hide?: boolean) => void;

  /** 更新元素位置 */
  updateView: (el?: Element) => void;
}

/**
 * @description Tooltip钩子参数类型
 * @interface TooltipHookParamsType
 */
export interface TooltipHookParamsType {
  /** 触发方式 */
  type: PropsType["type"];
}
