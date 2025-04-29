import type { Ref } from "vue";
import type { LocaleType } from "../useOptions/type";

/**
 * @description 翻译函数类型
 */
export type TranslateFunctionType = (key: string, values?: Record<string, any>) => string;

/**
 * @description useI18n钩子返回类型
 * @interface I18nReturnType
 */
export interface I18nReturnType {
  /** 翻译函数 */
  t: TranslateFunctionType;
  /** 当前语言 */
  locale: Ref<LocaleType>;
  /** 设置语言 */
  setLocale: (locale: LocaleType) => void;
}
