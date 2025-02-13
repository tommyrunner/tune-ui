/**
 * @description: 滚动条方向类型
 */
export type DirectionType = "top" | "left" | "none";

/**
 * @description: 组件props类型
 */
export interface PropsType {
  /** 容器高度 */
  height?: number;
  /** 滚动条是否常驻 */
  permanent?: boolean;
}

/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  /** 滚动事件 */
  (e: "scrollX" | "scrollY", listElement: HTMLElement): void;
}
