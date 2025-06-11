import type { IconTypes } from "@/packages/icon/icon";

/**
 * @description 面包屑项类型定义
 * @interface ValueType
 */
export type ValueType = {
  /** 显示文本 */
  label?: string;
  /** 唯一标识 */
  value?: string;
  /** 图标类型 */
  icon?: IconTypes;
  /** 跳转路由 */
  to?: string;
  /** 是否禁用 */
  disabled?: boolean;
};

/**
 * @description 面包屑组件属性类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 选项数据 */
  options: ValueType[];
  /** 分隔符图标 */
  separatedIcon?: IconTypes;
  /** 分隔符间距 */
  gap?: number;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 选择事件 */
  change: [ValueType];
  /** 点击事件 */
  click: [ValueType];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 面包屑内容 */
  default?: () => any;
}
