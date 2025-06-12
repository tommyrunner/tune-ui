import type { ValueType } from "./select";

/**
 * @description 选项组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 选项值 */
  value: ValueType;
  /** 选项标签 */
  label?: string;
  /** 选项子标签 */
  subLabel?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 子选项列表，用于级联选择 */
  children?: PropsType[];
}

/**
 * @description 选项组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 选项变更事件 */
  change: [PropsType];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 选项内容 */
  default?: () => any;
}
