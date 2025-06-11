import type { BaseProps } from "@/types";

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType extends BaseProps {
  /** 是否加载中 */
  loading?: boolean;
  /** 按钮圆角类型 */
  radius?: "default" | "square";
  /** 开启状态背景色 */
  onBgColor?: string;
  /** 关闭状态背景色 */
  offBgColor?: string;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 状态改变事件 */
  change: [data?: boolean];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 开启状态内容插槽 */
  onContent?: () => any;
  /** 关闭状态内容插槽 */
  offContent?: () => any;
}
