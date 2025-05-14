import { useI18n } from "@/hooks/useI18n";

export const useI18nText = () => {
  const { tr } = useI18n("calendar");
  const { tr: trCommon } = useI18n();

  return {
    // 星期标题
    TEXT_WEEK_DAYS: [tr("sun"), tr("mon"), tr("tue"), tr("wed"), tr("thu"), tr("fri"), tr("sat")],
    // 月份名称
    TEXT_MONTH_NAMES: [
      tr("jan"),
      tr("feb"),
      tr("mar"),
      tr("apr"),
      tr("may"),
      tr("jun"),
      tr("jul"),
      tr("aug"),
      tr("sep"),
      tr("oct"),
      tr("nov"),
      tr("dec")
    ],
    // 年月日时分秒
    TEXT_YEAR: tr("year"),
    TEXT_MONTH: tr("month"),
    TEXT_DAY: tr("day"),
    TEXT_HOUR: tr("hour"),
    TEXT_MINUTE: tr("minute"),
    TEXT_SECOND: tr("second"),

    // 基础
    TEXT_CONFIRM: trCommon("common.confirm"),
    TEXT_CANCEL: trCommon("common.cancel")
  };
};
