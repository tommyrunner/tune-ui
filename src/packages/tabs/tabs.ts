import type { IconTypes } from "@/packages/icon/icon";

/**
 * @description 值类型定义
 */
export type ValueType = string | number;

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 是否禁用 */
  disabled?: boolean;

  /** 选中值 */
  value?: ValueType;

  /** 自定义图标类型 */
  icon?: IconTypes;
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 标签页内容 */
  default?: () => any;
}
