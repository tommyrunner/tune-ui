import { useI18n } from "@/hooks/useI18n";
import type { PropsType } from "./drawer";

const { tr } = useI18n("common");

export const useI18nText = (props: PropsType) => {
  return {
    TEXT_CONFIRM: tr("confirm", props.confirmText),
    TEXT_CANCEL: tr("cancel", props.cancelText)
  };
};
