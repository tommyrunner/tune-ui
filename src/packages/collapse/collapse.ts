import type { IconTypes } from "@/packages/icon/icon";
/**
 * 值类型定义
 */
export type ValueType = string | number | boolean;
/**
 * @description: 组件props类型
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
 * @description: 组件emit类型
 */
export interface EmitsType {
  /** 选择事件 */
  (e: "change", data?: ValueType): void;
}
