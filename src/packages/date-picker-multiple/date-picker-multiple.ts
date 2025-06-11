import type { BaseProps } from "@/types";
import type { TipProps } from "@/hooks/useTip";
import type { DateType, ModeType } from "@/packages/calendar/calendar";
import { useI18n } from "@/hooks/useI18n";

/**
 * @description 快捷选项类型
 * @interface ShortcutType
 */
export interface ShortcutType {
  /** 快捷选项标签 */
  label: string;
  /** 快捷选项值 */
  value: DateType[] | (() => DateType[]);
}

/**
 * @description 多选日期选择器组件属性类型
 * @interface PropsType
 */
export interface PropsType extends BaseProps, TipProps {
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
  /** 占位符 */
  placeholder?: string;
  /** 是否可清空 */
  clearable?: boolean;
  /** 弹出位置 */
  position?: "top" | "bottom" | "left" | "right";
  /** 是否为范围选择模式 */
  isRange?: boolean;
  /** 快捷选项列表 */
  shortcuts?: ShortcutType[];
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 日期变化 */
  change: [DateType[]];
  /** 面板变化 */
  "panel-change": [ModeType];
  /** 清空事件 */
  clear: [];
  /** 聚焦事件 */
  focus: [];
  /** 失焦事件 */
  blur: [];
  /** 日期对话框打开事件 */
  "date-dialog-open": [];
  /** 日期对话框关闭事件 */
  "date-dialog-close": [];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 用于自定义触发器内容 */
  default?: () => any;
  /** 前缀插槽 */
  prefix?: () => any;
  /** 日期单元格插槽 */
  date?: (props: { date: Date }) => any;
  /** 月份单元格插槽 */
  month?: (props: { index: number; month: string }) => any;
  /** 年份单元格插槽 */
  year?: (props: { year: number }) => any;
  /** 底部插槽 */
  footer?: () => any;
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
const { t } = useI18n("datePicker");
export const DEFAULT_PLACEHOLDER = t("placeholderDate");
