/**
 * @description MenuGroup组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 分组标题 */
  title?: string;
}

/**
 * @description MenuGroup组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 分组内容 */
  default?: () => any;
}
