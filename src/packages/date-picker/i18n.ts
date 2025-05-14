import { useI18n } from "@/hooks/useI18n";
import type { PropsType } from "./date-picker";
const { t, tr } = useI18n("datePicker");

export const useI18nText = (props: PropsType) => {
  return {
    TEXT_DEFAULT_PLACEHOLDER: tr("common.placeholderDate", props.placeholder),
    TEXT_DATE_PARSE_ERROR: t("dateParseError"),
    TEXT_YEAR: t("year"),
    TEXT_MONTH: t("month")
  };
};
