import { useI18n } from "@/hooks/useI18n";
import type { PropsType } from "./list-view";

export const useI18nText = (props?: PropsType) => {
  const { tr } = useI18n("common");

  return {
    TEXT_EMPTY: tr("empty", props.emptyText)
  };
};
