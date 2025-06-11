import type { ComputedRef, Ref } from "vue";

/**
 * @description 日期类型
 */
export type DateType = Date | string | number;

/**
 * @description 日历模式
 */
export type ModeType = "date" | "month" | "year";

/**
 * @description 时间选择模式
 */
export type TimeSelectType = "hour" | "minute" | "second" | null;

/**
 * @description 日历组件属性类型
 */
export interface PropsType {
  /** 日历模式 */
  mode?: ModeType;
  /** 是否禁用 */
  disabled?: boolean;
  /** 不可选择的日期 */
  disabledDate?: (date: Date) => boolean;
  /** 是否显示时间选择器 */
  showTime?: boolean;
  /** 是否禁用时间选择器 */
  disabledTimeView?: boolean;
  /** 值的格式化，例如 YYYY-MM-DD */
  valueFormat?: string;
  /** 是否可以选择日期 */
  isSelect?: boolean;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export type EmitsType = {
  /** 日期变化 */
  change: [DateType];
  /** 面板变化 */
  "panel-change": [ModeType];
  /** 跳转到指定日期 */
  "jump-to-date": [Date];
  /** 时间变化 */
  "time-change": [Date];
  /** 时间对话框打开 */
  "time-dialog-open": [];
  /** 时间对话框关闭 */
  "time-dialog-close": [];
};

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 自定义日期渲染 */
  date?: (props: { date: Date }) => any;
  /** 自定义年份渲染 */
  year?: (props: { year: number }) => any;
  /** 自定义月份渲染 */
  month?: (props: { month: number; index: number }) => any;
  /** 底部区域 */
  footer?: () => any;
}

/**
 * @description 组件暴露的方法类型定义
 * @interface ExposesType
 */
export interface ExposesType {
  /** 跳转到指定日期 */
  jumpToDate: (date: Date) => void;
  /** 当前年份 */
  currentYear: ComputedRef<number>;
  /** 当前月份 */
  currentMonth: ComputedRef<number>;
  /** 切换面板模式 */
  switchPanelMode: (mode: ModeType) => void;
  /** 当前临时模式 */
  tempMode: Ref<ModeType>;
}

// 常量定义
/** 星期标题 */
export const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"];
/** 月份名称 */
export const MONTH_NAMES = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
/** 小时列表 */
export const HOURS = Array.from({ length: 24 }, (_, i) => i);
/** 分钟列表 */
export const MINUTES = Array.from({ length: 60 }, (_, i) => i);
/** 秒列表 */
export const SECONDS = Array.from({ length: 60 }, (_, i) => i);
