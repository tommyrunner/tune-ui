import type { IconTypes } from "@/packages/icon/icon";

/**
 * 轮播项组件属性类型定义
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
 * 轮播项组件事件类型定义
 */
export interface EmitsType {}
