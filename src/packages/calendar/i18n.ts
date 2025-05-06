import { useI18n } from "@/hooks/useI18n";

const { tr, t } = useI18n("calendar");
const { t: tCommon } = useI18n();

// 年月日时分秒
export const TEXT_YEAR = t("year");
export const TEXT_MONTH = t("month");
export const TEXT_DAY = t("day");
export const TEXT_HOUR = t("hour");
export const TEXT_MINUTE = t("minute");
export const TEXT_SECOND = t("second");

// 星期
export const TEXT_SUNDAY = tr("sun");
export const TEXT_MONDAY = tr("mon");
export const TEXT_TUESDAY = tr("tue");
export const TEXT_WEDNESDAY = tr("wed");
export const TEXT_THURSDAY = tr("thu");
export const TEXT_FRIDAY = tr("fri");
export const TEXT_SATURDAY = tr("sat");

// 月份
export const TEXT_JANUARY = tr("jan");
export const TEXT_FEBRUARY = tr("feb");
export const TEXT_MARCH = tr("mar");
export const TEXT_APRIL = tr("apr");
export const TEXT_MAY = tr("may");
export const TEXT_JUNE = tr("jun");
export const TEXT_JULY = tr("jul");
export const TEXT_AUGUST = tr("aug");
export const TEXT_SEPTEMBER = tr("sep");
export const TEXT_OCTOBER = tr("oct");
export const TEXT_NOVEMBER = tr("nov");
export const TEXT_DECEMBER = tr("dec");

// 基础
export const TEXT_CONFIRM = tCommon("common.confirm");
export const TEXT_CANCEL = tCommon("common.cancel");
