import type { IconTypes } from "@/packages/icon/icon";
import { PropsType as ButtonPropsType } from "../button/button";

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 内间距
  padding?: [number, number, number, number];
  // 阴影
  boxShadow?: [number, number, number, string];
  // 宽
  width?: string;
  // 是否禁用(显示)
  disabled?: boolean;
  // 标题
  title?: string;
  // icon
  icon?: IconTypes;
  // 是否又遮罩
  isModal?: boolean;
  // 按钮文字
  confirmText?: string;
  cancelText?: string;
  confirmType?: ButtonPropsType["type"];
  cancelType?: ButtonPropsType["type"];
  // 按钮对齐
  btnAlign?: "flex-start" | "center" | "flex-end";
  // 是否按下esc关闭
  closeOnPressEscape?: boolean;
  // 是否点击遮罩层关闭
  closeOnPressModel?: boolean;
  // 是否显示默认按钮组
  isFoot?: boolean;
  // 是否显示关闭icon
  isCloseIcon?: boolean;
  // 是否可以拖动
  draggable?: boolean;
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
