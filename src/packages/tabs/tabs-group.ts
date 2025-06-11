import type { ValueType } from "./tabs";

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 标签页类型 */
  type?: "line" | "block" | "border";

  /** 标签页高度 */
  height?: string;

  /** 标签页间距(为0充满父元素) */
  gap?: number;

  /** 是否显示关闭按钮 */
  isClose?: boolean;

  /** 切换动画时长(毫秒) */
  actionDuration?: number;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 切换事件 */
  change: [data?: ValueType];
  /** 关闭事件 */
  close: [data?: ValueType];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 标签页组内容 */
  default?: () => any;
}

/**
 * @description 组件暴露方法类型定义
 * @interface ExposesType
 */
export interface ExposesType {
  /** 更新action位置 */
  updateAction: () => void;
}
