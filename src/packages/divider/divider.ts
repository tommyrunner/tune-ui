/**
 * @description Divider组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 设置分割线方向 */
  direction?: "horizontal" | "vertical";
  /** 设置分隔符样式 */
  borderStyle?: "solid" | "dashed" | "dotted" | "double";
  /** 自定义分隔线内容的位置 */
  contentPosition?: "left" | "center" | "right";
}

/**
 * @description Divider组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {}

/**
 * @description Divider组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 分割线内容 */
  default?: () => any;
}
