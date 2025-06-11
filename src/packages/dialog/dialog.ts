import type { IconTypes } from "@/packages/icon/icon";
import type { PropsType as ButtonPropsType } from "@/packages/button/button";

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 内间距 [上, 右, 下, 左] */
  padding?: [number, number, number, number];
  /** 阴影 [x偏移, y偏移, 模糊度, 颜色] */
  boxShadow?: [number, number, number, string];
  /** 宽度 */
  width?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 标题文本 */
  title?: string;
  /** 标题图标 */
  icon?: IconTypes;
  /** 是否显示遮罩层 */
  isModal?: boolean;
  /** 确认按钮文本 */
  confirmText?: string;
  /** 取消按钮文本 */
  cancelText?: string;
  /** 确认按钮类型 */
  confirmType?: ButtonPropsType["type"];
  /** 取消按钮类型 */
  cancelType?: ButtonPropsType["type"];
  /** 按钮对齐方式 */
  btnAlign?: "flex-start" | "center" | "flex-end";
  /** 是否可以按ESC关闭 */
  closeOnPressEscape?: boolean;
  /** 是否可以点击遮罩层关闭 */
  closeOnPressModel?: boolean;
  /** 是否显示底部按钮组 */
  isFoot?: boolean;
  /** 是否显示关闭图标 */
  isCloseIcon?: boolean;
  /** 是否可拖动 */
  draggable?: boolean;
  /** 偏移位置 */
  offset?: {
    x: number;
    y: number;
  };
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
  /** 默认插槽 - 对话框内容 */
  default?: () => any;
  /** 标题插槽 */
  title?: () => any;
  /** 底部插槽 */
  footer?: () => any;
}
