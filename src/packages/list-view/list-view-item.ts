/**
 * @description 值类型定义
 */
export type ValueType = string | number;

/**
 * @description 列表项Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 项目高度 */
  height?: number;
  /** 是否固定项 */
  fixed?: boolean;
  /** 虚拟列表定位位置 */
  top?: number;
}

/**
 * @description 列表项插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 列表项内容 */
  default?: () => any;
}
