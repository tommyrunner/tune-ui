import { computed, type InjectionKey } from "vue";
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
const { t } = useI18n("calendar");

/** 星期标题 */
export const WEEK_DAYS = computed(() => [t("sun"), t("mon"), t("tue"), t("wed"), t("thu"), t("fri"), t("sat")]);

/** 月份名称 */
export const MONTH_NAMES = computed(() => [
  t("jan"),
  t("feb"),
  t("mar"),
  t("apr"),
  t("may"),
  t("jun"),
  t("jul"),
  t("aug"),
  t("sep"),
  t("oct"),
  t("nov"),
  t("dec")
]);

/** 小时列表 */
export const HOURS = Array.from({ length: 24 }, (_, i) => i);
/** 分钟列表 */
export const MINUTES = Array.from({ length: 60 }, (_, i) => i);
/** 秒列表 */
export const SECONDS = Array.from({ length: 60 }, (_, i) => i);
