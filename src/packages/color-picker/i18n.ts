import { useI18n } from "@/hooks/useI18n";

export const useI18nText = () => {
  const { t } = useI18n("common");
  return {
    TEXT_CLEAR: t("clear"),
    TEXT_CONFIRM: t("confirm")
  };
};
