import type { IconTypes } from "../icon/icon";
import { PropsType as ButtonPropsType } from "../button/button";

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 内间距
  padding?: [number, number, number, number];
  // 阴影
  boxShadow?: [number, number, number, string];
  // 大小
  size?: string;
  // 是否禁用(显示)
  disabled?: boolean;
  // 标题
  title?: string;
  // icon
  icon?: IconTypes;
  // 是否有遮罩
  isModal?: boolean;
  // 按钮文字
  confirmText?: string;
  cancelText?: string;
  confirmType?: ButtonPropsType["type"];
  cancelType?: ButtonPropsType["type"];
  // 按钮对齐
  btnAlign?: "flex-start" | "center" | "flex-end";
  // 方向
  position?: "top" | "right" | "bottom" | "left";
  // 是否按下esc关闭
  closeOnPressEscape?: boolean;
  // 是否点击遮罩层关闭
  closeOnPressModel?: boolean;
  // 是否显示默认按钮组
  isFoot?: boolean;
  // 是否设置全屏高度值(适用于 left|right)
  isSetMaxHeight?: boolean;
  // 是否显示关闭icon
  isCloseIcon?: boolean;
  // 偏移xy轴
  offset?: {
    x: number;
    y: number;
  };
}

/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 提交
  (e: "confirm"): void;
  // 取消
  (e: "cancel"): void;
  // 打开关闭回调
  (e: "open"): void;
  (e: "close"): void;
}
