import { useI18n } from "@/hooks/useI18n";
import type { PropsType } from "./pop-confirm";

export const useI18nText = (props?: PropsType) => {
  const { tr } = useI18n("common");

  return {
    TEXT_CONFIRM: tr("confirm", props.confirmText),
    TEXT_CANCEL: tr("cancel", props.cancelText)
  };
};
