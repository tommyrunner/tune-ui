import type { BaseProps } from "@/types";
import type { ValueType } from "./radio";
/**
 * RadioGroup组件的Props类型定义
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
 * RadioGroup组件的事件类型定义
 */
export interface EmitsType {
  /** 选择改变事件 */
  (e: "change", data?: ValueType): void;
}
