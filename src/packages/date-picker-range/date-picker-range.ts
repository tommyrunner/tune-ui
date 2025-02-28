import type { BaseProps } from "@/types";
import type { DateType, ModeType } from "../calendar/calendar";

/**
 * @description 快捷选择项类型
 */
export interface ShortcutType {
  /** 标签文本 */
  label: string;
  /** 日期范围值 [开始日期, 结束日期] */
  value: [DateType, DateType];
}

/**
 * @description 日期范围选择器组件属性类型
 */
export interface PropsType extends BaseProps {
  /** 日期选择器模式 */
  mode?: ModeType;
  /** 是否禁用 */
  disabled?: boolean;
  /** 不可选择的日期 */
  disabledDate?: (date: Date) => boolean;
  /** 是否显示时间选择器 */
  showTime?: boolean;
  /** 值的格式化，例如 YYYY-MM-DD */
  valueFormat?: string;
  /** 显示格式化，例如 YYYY年MM月DD日 */
  format?: string;
  /** 开始日期占位符 */
  startPlaceholder?: string;
  /** 结束日期占位符 */
  endPlaceholder?: string;
  /** 是否可清空 */
  clearable?: boolean;
  /** 弹出位置 */
  position?: "top" | "bottom" | "left" | "right";
  /** 快捷选择项 */
  shortcuts?: ShortcutType[];
  /** 分隔符 */
  separator?: string;
}

/**
 * @description 组件事件类型
 */
export interface EmitsType {
  /** 日期范围变化 */
  (e: "change", value: [DateType, DateType]): void;
  /** 面板变化 */
  (e: "panel-change", mode: ModeType): void;
  /** 清空事件 */
  (e: "clear"): void;
  /** 聚焦事件 */
  (e: "focus"): void;
  /** 失焦事件 */
  (e: "blur"): void;
  /** 时间对话框打开事件 */
  (e: "time-dialog-open"): void;
  /** 时间对话框关闭事件 */
  (e: "time-dialog-close"): void;
  /** 日期对话框打开事件 */
  (e: "date-dialog-open"): void;
  /** 日期对话框关闭事件 */
  (e: "date-dialog-close"): void;
}

// 常量定义
/** 图标颜色 */
export const ICON_COLOR = "#656a6e56";
/** 下拉框圆角 */
export const DROPDOWN_RADIUS = 6;
/** 图标尺寸映射 */
export const ICON_SIZES = {
  default: 14,
  small: 14,
  large: 16
}; 