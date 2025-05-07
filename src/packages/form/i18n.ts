import { useI18n } from "@/hooks/useI18n";

const { t: tCommon } = useI18n("common");
const { t } = useI18n("form");

export const TEXT_SUBMIT = tCommon("submit");
export const TEXT_RESET = tCommon("retry");
export const TEXT_REQUIRED = t("messageRequired");
export const TEXT_MIN = t("messageMin");
export const TEXT_MAX = t("messageMax");
export const TEXT_PATTERN = t("messagePattern");
export const TEXT_VALIDATOR = t("messageValidator");
