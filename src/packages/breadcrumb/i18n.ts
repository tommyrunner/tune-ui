import { useI18n } from "@/hooks/useI18n";

export const useI18nText = () => {
  const { t } = useI18n("breadcrumb");
  return {
    TEXT_ROUTE_NOT_FOUND: t("routeNotFound"),
    TEXT_ROUTE_NOT_SET: t("routeNotSet")
  };
};
