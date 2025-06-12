import { Ref } from "vue";

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
  /** X轴滚动事件 */
  "scroll-x": [HTMLElement];
  /** Y轴滚动事件 */
  "scroll-y": [HTMLElement];
  /** 滚动条轨道点击事件 */
  "click-track": [HTMLElement];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 滚动内容 */
  default?: () => any;
}

/**
 * @description 组件暴露方法类型定义
 * @interface ExposesType
 */
export interface ExposesType {
  /** 更新滚动条 */
  updateScrollbar: () => void;
  /** 设置滚动条位置 */
  setScrollbar: (mobile: number, direction: DirectionType) => void;
  /** 内容容器引用 */
  contentRef: Ref<HTMLDivElement>;
  /** 滚动到指定位置 */
  scrollTo: (options: ScrollToOptions) => void;
}
