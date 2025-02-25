import type { ElSizeType, BaseProps } from "@/types";
import type { PropsType as OptionsItem } from "./option";
import type { TipProps } from "@/hooks/useTip";
/**
 * @description 列表项插槽参数类型
 */
export type SelectSlotParamsType<T = any> = {
  /** 行数据 */
  row?: T;
  /** 行下标 */
  index?: number;
};

/**
 * @description 选项类型
 */
export type OptionsItemType = OptionsItem;

/**
 * @description 值类型定义
 */
export type SingleValueType = string | number | object;
export type ValueType = SingleValueType | SingleValueType[];

/**
 * @description 组件属性类型
 */
export interface PropsType extends TipProps, BaseProps {
  /** 选项列表 */
  options: OptionsItemType[];
  /** 选择器类型 */
  type?: "input" | "text";
  /** 是否可清空 */
  clearable?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 空状态文本 */
  emptyText?: string;
  /** 是否可过滤 */
  filterable?: boolean;
  /** 是否多选 */
  multiple?: boolean;
  /** 远程搜索方法(必须开启filterable) */
  remoteMethod?: (query: string) => void;
  /** 自定义过滤方法 */
  filterMethod?: (option: OptionsItemType, query: string) => boolean;
}

/**
 * @description 组件事件类型
 */
export interface EmitsType {
  /** 清空事件 */
  (e: "clear"): void;
}

// 常量定义
/** 图标颜色 */
export const ICON_COLOR = "#656a6e56";
/** 下拉框圆角 */
export const DROPDOWN_RADIUS = 6;
/** 图标尺寸映射 */
export const ICON_SIZES: Record<ElSizeType, number> = {
  default: 14,
  small: 14,
  large: 16
};
/** 空选项 */
export const EMPTY_OPTION: OptionsItemType = { label: "", value: "" };
