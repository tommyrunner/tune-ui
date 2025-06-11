import type { IconTypes } from "@/packages/icon/icon";

/**
 * @description 回到顶部组件属性类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 触发滚动的目标元素 */
  target?: HTMLElement | string;
  /** 图标类型 */
  icon?: IconTypes;
  /** 图标大小 */
  iconSize?: number;
  /** 距离底部距离 */
  bottom?: string;
  /** 距离右侧距离 */
  right?: string;
  /** 显示触发的滚动高度 */
  visibilityHeight?: number;
  /** 是否使用朴素样式 */
  plain?: boolean;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 点击事件 */
  click: [];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 回到顶部按钮内容 */
  default?: () => any;
}
