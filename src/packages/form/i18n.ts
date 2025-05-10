import { useI18n } from "@/hooks/useI18n";
import type { FormPropsType } from "./form";

export const useI18nText = (props?: FormPropsType) => {
  const { tr: trCommon } = useI18n("common");
  const { t } = useI18n("form");

  return {
    TEXT_SUBMIT: trCommon("submit", props?.submitText),
    TEXT_RESET: trCommon("retry", props?.resetText),
    TEXT_REQUIRED: t("messageRequired"),
    TEXT_MIN: t("messageMin"),
    TEXT_MAX: t("messageMax"),
    TEXT_PATTERN: t("messagePattern"),
    TEXT_VALIDATOR: t("messageValidator")
  };
};
