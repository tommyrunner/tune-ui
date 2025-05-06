import type { InjectionKey } from "vue";
import type { PropsType } from "./calendar";
import {
  TEXT_SUNDAY,
  TEXT_MONDAY,
  TEXT_TUESDAY,
  TEXT_WEDNESDAY,
  TEXT_THURSDAY,
  TEXT_FRIDAY,
  TEXT_SATURDAY,
  TEXT_JANUARY,
  TEXT_FEBRUARY,
  TEXT_MARCH,
  TEXT_APRIL,
  TEXT_MAY,
  TEXT_JUNE,
  TEXT_JULY,
  TEXT_AUGUST,
  TEXT_SEPTEMBER,
  TEXT_OCTOBER,
  TEXT_NOVEMBER,
  TEXT_DECEMBER
} from "./i18n";

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

/** 星期标题 */
export const WEEK_DAYS = [TEXT_SUNDAY, TEXT_MONDAY, TEXT_TUESDAY, TEXT_WEDNESDAY, TEXT_THURSDAY, TEXT_FRIDAY, TEXT_SATURDAY];

/** 月份名称 */
export const MONTH_NAMES = [
  TEXT_JANUARY,
  TEXT_FEBRUARY,
  TEXT_MARCH,
  TEXT_APRIL,
  TEXT_MAY,
  TEXT_JUNE,
  TEXT_JULY,
  TEXT_AUGUST,
  TEXT_SEPTEMBER,
  TEXT_OCTOBER,
  TEXT_NOVEMBER,
  TEXT_DECEMBER
];

/** 小时列表 */
export const HOURS = Array.from({ length: 24 }, (_, i) => i);
/** 分钟列表 */
export const MINUTES = Array.from({ length: 60 }, (_, i) => i);
/** 秒列表 */
export const SECONDS = Array.from({ length: 60 }, (_, i) => i);
