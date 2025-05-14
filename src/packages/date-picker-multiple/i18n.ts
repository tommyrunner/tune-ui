import { useI18n } from "@/hooks/useI18n";
import type { PropsType } from "./date-picker-multiple";

const { tr } = useI18n("common");

export const useI18nText = (props: PropsType) => {
  return {
    TEXT_DEFAULT_PLACEHOLDER: tr("placeholderDate", props.placeholder),
    TEXT_CONFIRM: tr("confirm"),
    TEXT_CANCEL: tr("cancel")
  };
};
