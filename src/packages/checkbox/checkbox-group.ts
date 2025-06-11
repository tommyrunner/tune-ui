import type { BaseProps } from "@/types";
import type { ValueType } from "./checkbox";

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType extends BaseProps {
  /** 绑定对象标记key */
  objKey?: string;
  /** group类型 */
  type?: "default" | "text" | "border" | "button";
  /** group方向 */
  direction?: "column" | "row";
  /** 是否立即出发change */
  immediateChange?: boolean;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 切换事件 */
  change: [ValueType?];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 复选框组内容 */
  default?: () => any;
}
