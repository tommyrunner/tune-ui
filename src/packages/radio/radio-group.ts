import type { BaseProps } from "@/types";
import type { ValueType } from "./radio";

/**
 * @description RadioGroup组件的Props类型定义
 * @interface PropsType
 * @extends {BaseProps}
 */
export interface PropsType extends BaseProps {
  /** 绑定对象标记key */
  objKey?: string;
  /** 单选框组类型 */
  type?: "default" | "text" | "border" | "button";
  /** 排列方向 */
  direction?: "column" | "row";
  /** 是否立即触发change事件 */
  immediateChange?: boolean;
}

/**
 * @description RadioGroup组件的事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 选择改变事件 */
  change: [ValueType];
}

/**
 * @description RadioGroup组件的插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 单选框内容 */
  default?: () => any;
}
