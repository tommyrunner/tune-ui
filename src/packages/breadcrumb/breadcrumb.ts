import type { IconTypes } from "@/packages/icon/icon";

/**
 * 面包屑项类型定义
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
 * 面包屑组件属性类型定义
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
 * 面包屑组件事件类型定义
 */
export interface EmitsType {
  /** 选择事件 */
  (e: "change", data: ValueType): void;
  /** 点击事件 */
  (e: "click", data: ValueType): void;
}
