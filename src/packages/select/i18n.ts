import { useI18n } from "@/hooks/useI18n";
import type { PropsType } from "./select";

export const useI18nText = (props?: PropsType) => {
  const { tr } = useI18n("common");
  return {
    TEXT_PLACEHOLDER_SELECT: tr("placeholderSelect", props.placeholder),
    TEXT_EMPTY: tr("empty", props.emptyText)
  };
};
