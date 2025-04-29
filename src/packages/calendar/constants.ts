import type { InjectionKey } from "vue";
import type { PropsType } from "./calendar";
import { useI18n } from "@/hooks/useI18n";

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

// 国际化
const { t } = useI18n();

/** 星期标题 */
export const WEEK_DAYS = [
  t("calendar.week.sun"),
  t("calendar.week.mon"),
  t("calendar.week.tue"),
  t("calendar.week.wed"),
  t("calendar.week.thu"),
  t("calendar.week.fri"),
  t("calendar.week.sat")
];

/** 月份名称 */
export const MONTH_NAMES = [
  t("calendar.month.jan"),
  t("calendar.month.feb"),
  t("calendar.month.mar"),
  t("calendar.month.apr"),
  t("calendar.month.may"),
  t("calendar.month.jun"),
  t("calendar.month.jul"),
  t("calendar.month.aug"),
  t("calendar.month.sep"),
  t("calendar.month.oct"),
  t("calendar.month.nov"),
  t("calendar.month.dec")
];

/** 小时列表 */
export const HOURS = Array.from({ length: 24 }, (_, i) => i);
/** 分钟列表 */
export const MINUTES = Array.from({ length: 60 }, (_, i) => i);
/** 秒列表 */
export const SECONDS = Array.from({ length: 60 }, (_, i) => i);
