import type { IconTypes } from "@/packages/icon/icon";
import type { PropsType as ButtonPropsType } from "../button/button";

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 内边距大小 */
  padding?: [number, number, number, number] | number;

  /** 阴影配置 */
  boxShadow?: [number, number, number, string];

  /** 最大宽度 */
  maxWidth?: string;

  /** 是否禁用 */
  disabled?: boolean;

  /** 确认框内容 */
  content?: string;

  /** 图标类型 */
  icon?: IconTypes;

  /** 图标颜色 */
  iconColor?: string;

  /** 确认按钮文字 */
  confirmText?: string;

  /** 取消按钮文字 */
  cancelText?: string;

  /** 确认按钮类型 */
  confirmType?: ButtonPropsType["type"];

  /** 取消按钮类型 */
  cancelType?: ButtonPropsType["type"];

  /** 弹出位置 */
  position?: "top" | "right" | "bottom" | "left";

  /** 是否支持ESC键关闭 */
  closeOnPressEscape?: boolean;

  /** 是否点击其他区域关闭 */
  closeOnPressOther?: boolean;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 确认事件 */
  confirm: [];

  /** 取消事件 */
  cancel: [];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 触发元素内容 */
  default?: () => any;

  /** 内容插槽 - 自定义确认框内容 */
  content?: () => any;
}
