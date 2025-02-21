import { type BaseProps } from "@/types";
import type { IconTypes } from "@/packages/icon/icon";
import type { ElSizeType } from "@/types";

/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  /** 标签类型 */
  type?: "default" | "primary" | "success" | "info" | "warning" | "danger";
  /** 前缀图标 */
  prefixIcon?: IconTypes;
  /** 后缀图标 */
  suffixIcon?: IconTypes;
  /** 是否圆角 */
  round?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  /** 点击前缀图标事件 */
  (e: "click-prefix"): void;
  /** 点击后缀图标事件 */
  (e: "click-suffix"): void;
}

// 不同尺寸对应的图标大小
export const ICON_SIZES: Record<ElSizeType, number> = {
  default: 12,
  small: 10,
  large: 14
}; 