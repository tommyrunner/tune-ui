/**
 * @description 对齐方式类型定义
 */
export type AlignmentTypes = "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 栅格间隔(px) */
  gap?: number;
  /** 水平对齐方式 */
  align?: AlignmentTypes;
  /** 垂直对齐方式 */
  justify?: AlignmentTypes;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  // 该组件无事件
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 弹性布局组内容 */
  default?: () => any;
}
