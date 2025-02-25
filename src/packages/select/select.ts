import { ElSizeType, type BaseProps } from "@/types";
import { PropsType as OptionsItem } from "./option";
import { TipProps } from "@/hooks/useTip";
/**
 * @description 列表项插槽参数类型
 */
export type SelectSlotParamsType<T = any> = {
  /** 行数据 */
  row?: T;
  /** 行下标 */
  index?: number;
};

// 组件默认容器圆角
export const contentRadius = 6;
export type OptionsItemType = OptionsItem;
/**
 * value 类型
 */
export type SingleValueType = string | number | object;
export type ValueType = SingleValueType | SingleValueType[];
/**
 * @description: 组件props类型
 */
export interface PropsType extends TipProps, BaseProps {
  // 列表值
  options: OptionsItemType[];
  // 选择显示类型
  type?: "input" | "text";
  // 是否清空
  clearable?: boolean;
  // 是否禁用
  disabled?: boolean;
  // 空值
  emptyText?: string;
  // 是否过滤
  filterable?: boolean;
  // 是否多选
  multiple?: boolean;
  // 远程方法
  remoteMethod?: (query: string) => void;
  // 过滤方法
  filterMethod?: (option: OptionsItemType, query: string) => boolean;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 清空事件
  (e: "clear"): void;
}

// 常量定义
export const ICON_COLOR = "#656a6e56";
export const DROPDOWN_RADIUS = contentRadius;
export const ICON_SIZES: Record<ElSizeType, number> = {
  default: 14,
  small: 14,
  large: 16
};
export const EMPTY_OPTION: OptionsItemType = { label: "", value: "" };
