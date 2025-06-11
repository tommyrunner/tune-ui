import type { IconTypes } from "@/packages/icon/icon";
/**
 * @description 值类型定义
 */
export type ValueType = string | number | boolean;
/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 绑定值 */
  value?: ValueType;
  /** 标题 */
  title?: string;
  /** 右侧图标 */
  rightIcon?: IconTypes;
  /** 是否禁用 */
  disabled?: boolean;
}
/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export type EmitsType = {
  /** 选择事件 */
  change: [ValueType?];
};
/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 折叠面板内容 */
  default?: () => any;
  /** 标题插槽 */
  title?: (props: { value: ValueType }) => any;
  /** 头部右侧插槽 */
  headRight?: (props: { value: ValueType }) => any;
}
