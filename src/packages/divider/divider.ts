/**
 * @description Divider组件Props类型定义
 * @interface PropsType
 * @extends {BaseProps}
 */
export interface PropsType {
  /** 设置分割线方向 */
  direction?: "horizontal" | "vertical";
  /** 设置分隔符样式 */
  borderStyle?: "solid" | "dashed" | "dotted" | "double";
  /** 自定义分隔线内容的位置 */
  contentPosition?: "left" | "center" | "right";
}
