import type { BaseProps } from "@/types";
import type { IconTypes } from "@/packages/icon/icon";
/**
 * @description value 类型
 */
export type ValueType = string | number | boolean | object;
/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType extends BaseProps {
  /** 选中图形样式 */
  radius?: "default" | "square";
  /** 绑定对象类型的标记key */
  objKey?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 原生name值 */
  name?: string;
  /** 状态值 */
  value?: ValueType;
  /** 自定义图表图形 */
  icon?: IconTypes;
  /** 是否半选 */
  indeterminate?: boolean;
  /** 半选图标 */
  indeterminateIcon?: IconTypes;
}
/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 选择事件 */
  change: [ValueType?];
}
/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 复选框标签文本 */
  default?: () => any;
  /** 自定义复选框图形插槽 */
  checkboxSpan?: (props: { value: ValueType }) => any;
}
