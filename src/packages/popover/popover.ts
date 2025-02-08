import type { RendererElement } from "vue";

/** 全局三角箭头宽度(半径) */
export const triangleWidth = 8;

/**
 * Popover组件的Props类型定义
 */
export interface PropsType {
  /** 弹出框宽度 */
  width?: string;

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

  /** 是否显示遮罩层 */
  isModal?: boolean;

  /** 是否允许遮罩层嵌套 */
  isModalNest?: boolean;
}

/**
 * Tooltip钩子参数类型
 */
export interface TooltipHookParamsType {
  type: PropsType["type"];
}

/**
 * Popover组件的事件类型定义
 */
export interface EmitsType {
  /** 点击遮罩层事件 */
  (e: "clickModel"): void;

  /** hover进入事件 */
  (e: "hoverEnter", el: HTMLElement): void;

  /** hover离开事件 */
  (e: "hoverOut", el: HTMLElement): void;

  /** 显示状态改变事件 */
  (e: "modelChange"): void;

  /** 打开事件 */
  (e: "open"): void;

  /** 关闭事件 */
  (e: "close"): void;
}
