import type { IconTypes } from "@/packages/icon/icon";
import type { PropsType as ButtonPropsType } from "@/packages/button/button";

/**
 * @description: 组件props类型
 */
export interface PropsType {
  /** 内间距 [上, 右, 下, 左] */
  padding?: [number, number, number, number] | number;
  /** 阴影 [x偏移, y偏移, 模糊度, 颜色] */
  boxShadow?: [number, number, number, string];
  /** 抽屉尺寸 */
  size?: string;
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
  /** 抽屉弹出方向 */
  position?: "top" | "right" | "bottom" | "left";
  /** 是否可以按ESC关闭 */
  closeOnPressEscape?: boolean;
  /** 是否可以点击遮罩层关闭 */
  closeOnPressModel?: boolean;
  /** 是否显示底部按钮组 */
  isFoot?: boolean;
  /** 是否设置全屏高度(适用于左右方向) */
  isSetMaxHeight?: boolean;
  /** 是否显示关闭图标 */
  isCloseIcon?: boolean;
  /** 偏移位置 */
  offset?: {
    x: number;
    y: number;
  };
}

/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  /** 确认事件 */
  (e: "confirm"): void;
  /** 取消事件 */
  (e: "cancel"): void;
  /** 打开事件 */
  (e: "open"): void;
  /** 关闭事件 */
  (e: "close"): void;
}
