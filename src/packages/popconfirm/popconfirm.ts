import type { IconTypes } from "@/packages/icon/icon";
import type { PropsType as ButtonPropsType } from "../button/button";

/**
 * PopConfirm组件的Props类型定义
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
 * PopConfirm组件的事件类型定义
 */
export interface EmitsType {
  /** 确认事件 */
  (e: "confirm"): void;

  /** 取消事件 */
  (e: "cancel"): void;
}
