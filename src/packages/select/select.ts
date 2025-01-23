import { type BaseProps } from "@/types";
import { PropsType as OptionsItem } from "./option";
import { TipProps } from "@/hooks/useTip";

// 组件默认容器圆角
export const contentRadius = 6;
export type OptionsItemType = OptionsItem;
/**
 * value 类型
 */
export type ValueType = string | number | object;
/**
 * @description: 组件props类型
 */
export interface PropsType extends TipProps, BaseProps {
  // 选择显示类型
  type?: "input" | "text";
  // 显示文本提示文字
  textLabel?: string;
  // 是否清空
  clearable?: boolean;
  // 是否禁用
  disabled?: boolean;
  // 列表值
  options: OptionsItemType[];
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 清空事件
  (e: "clear"): void;
}
