import type { ValueType } from "./collapse";

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 是否开启手风琴模式 */
  accordion?: boolean;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 切换事件 */
  change: [ValueType[]?];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 折叠面板组内容 */
  default?: () => any;
}
