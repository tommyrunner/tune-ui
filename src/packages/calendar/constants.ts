import type { InjectionKey } from "vue";
import type { PropsType } from "./calendar";

/** 日历组件上下文类型 */
export interface CalendarContextType extends PropsType {
  /** 当前日期 */
  currentDate: Date;
  /** 内部值 */
  internalValue: Date;
  /** 处理日期选择 */
  handleSelectDate: (date: Date) => void;
  /** 处理年份选择 */
  handleYearSelect: (year: number) => void;
  /** 处理月份选择 */
  handleMonthSelect: (month: number) => void;
}

/** 日历组件注入键 */
export const calendarKey: InjectionKey<CalendarContextType> = Symbol("calendarKey");

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
