import { useI18n } from "@/hooks/useI18n";

const { t } = useI18n("datePicker");

export const TEXT_DEFAULT_PLACEHOLDER = t("common.placeholderDate");
export const TEXT_DATE_PARSE_ERROR = t("dateParseError");
export const TEXT_YEAR = t("year");
export const TEXT_MONTH = t("month");
