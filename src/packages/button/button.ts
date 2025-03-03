import type { ElSizeType, BaseProps } from "@/types";
import type { IconTypes } from "@/packages/icon/icon";

/**
 * @description Button组件Props类型定义
 * @interface PropsType
 * @extends {BaseProps}
 */
export interface PropsType extends BaseProps {
  /** 按钮类型 */
  type?: "default" | "primary" | "success" | "info" | "warning" | "danger" | "text";
  /** 前缀图标 */
  prefixIcon?: IconTypes;
  /** 后缀图标 */
  suffixIcon?: IconTypes;
  /** 加载状态 */
  loading?: boolean;
  /** 按钮圆角类型 */
  radius?: "default" | "round" | "circle";
  /** 自定义按钮颜色 */
  color?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否启用缩放效果 */
  scale?: boolean;
}

/**
 * @description Button组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 点击事件 */
  (e: "click", data: MouseEvent): void;
}

/**
 * @description 不同尺寸对应的图标大小映射
 */
export const ICON_SIZES: Record<ElSizeType, number> = {
  default: 14,
  small: 8,
  large: 16
};
