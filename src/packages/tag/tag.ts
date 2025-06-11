import { type BaseProps } from "@/types";
import type { ElSizeType } from "@/types";

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType extends BaseProps {
  /** 标签类型 */
  type?: "default" | "primary" | "success" | "info" | "warning" | "danger";
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 是否圆角 */
  round?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 关闭事件 */
  close: [];
  /** 点击事件 */
  click: [];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 标签内容 */
  default?: () => any;
}

/**
 * @description 不同尺寸对应的图标大小配置
 */
export const ICON_SIZES: Record<ElSizeType, number> = {
  default: 12,
  small: 8,
  large: 14
};
