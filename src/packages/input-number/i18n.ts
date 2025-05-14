import { useI18n } from "@/hooks/useI18n";
import type { PropsType } from "./input-number";

export const useI18nText = (props?: PropsType) => {
  const { tr } = useI18n("common");

  return {
    TEXT_PLACEHOLDER: tr("placeholder", props.placeholder)
  };
};
