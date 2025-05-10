import type { Ref, ComputedRef } from "vue";
import type { LocaleType } from "../useOptions/type";

/**
 * @description 普通翻译函数类型
 */
export type TranslateFunctionType = (key: string, values?: Record<string, any>) => string;

/**
 * @description 响应式翻译函数类型
 */
export type ReactiveTranslateFunctionType = (key: string, priority?: string, values?: Record<string, any>) => ComputedRef<string>;

/**
 * @description useI18n钩子返回类型
 * @interface I18nReturnType
 */
export interface I18nReturnType {
  /** 普通翻译函数 */
  t: TranslateFunctionType;
  /** 响应式翻译函数 */
  tr: ReactiveTranslateFunctionType;
  /** 当前语言 */
  locale: Ref<LocaleType>;
  /** 设置语言 */
  setLocale: (locale: LocaleType) => void;
}
