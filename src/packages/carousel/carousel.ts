import type { IconTypes } from "@/packages/icon/icon";

/**
 * @description 轮播项组件属性类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 标题 */
  title?: string;
  /** 右侧图标 */
  rightIcon?: IconTypes;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 轮播项内容 */
  default?: () => any;
}

/**
 * 轮播项组件事件类型定义
 */
export interface EmitsType {}
