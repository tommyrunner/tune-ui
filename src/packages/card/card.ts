import type { IconTypes } from "@/packages/icon/icon";

/**
 * @description 卡片组件属性类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 阴影显示时机 */
  shadow?: "always" | "hover" | "never";
  /** 卡片标题 */
  title?: string;
  /** 标题图标 */
  titleIcon?: IconTypes;
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 卡片主体内容 */
  default?: () => any;
  /** 头部左侧插槽 */
  headLeft?: () => any;
  /** 头部右侧插槽 */
  headRight?: () => any;
  /** 底部插槽 */
  footer?: () => any;
}
