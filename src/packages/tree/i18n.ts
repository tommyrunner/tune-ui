import { useI18n } from "@/hooks/useI18n";

export const useI18nText = () => {
  const { t } = useI18n("common");
  return {
    TEXT_EMPTY: t("empty")
  };
};
