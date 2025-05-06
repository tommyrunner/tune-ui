import { useOptions } from "../useOptions";
import type { I18nReturnType } from "./type";
import { getMessages } from "../../locale";
import { computed } from "vue";

/**
 * i18n国际化钩子
 * @param {string} [namespace] - 命名空间，可选
 * @returns {I18nReturnType} 翻译函数和语言相关方法
 */
export function useI18n(namespace?: string): I18nReturnType {
  const { locale, setLocale } = useOptions();

  /**
   * 翻译文本处理函数（内部共享逻辑）
   * @param {string} key - 翻译键
   * @param {Record<string, any>} values - 替换值
   * @returns {string} 翻译后的文本
   */
  const translateText = (key: string, values: Record<string, any> = {}): string => {
    const currentLocale = locale.value;
    const messages = getMessages(currentLocale);

    let result = key;
    // 如果key包含.，不使用命名空间
    if (key.includes(".")) {
      result = messages[key] || key;
    } else {
      const namespacedKey = `${namespace}.${key}`;
      result = messages[namespacedKey] || messages[key] || key;
    }

    // 简单的插值替换
    if (values && Object.keys(values).length > 0) {
      result = result.replace(/\{(\w+)\}/g, (_, k) => {
        return values[k] !== undefined ? String(values[k]) : `{${k}}`;
      });
    }

    return result;
  };

  /**
   * 普通翻译函数
   * @param {string} key - 翻译键
   * @param {Record<string, any>} values - 替换值
   * @returns {string} 翻译后的文本
   */
  const t = (key: string, values: Record<string, any> = {}): string => {
    return translateText(key, values);
  };

  /**
   * 响应式翻译函数
   * @param {string} key - 翻译键
   * @param {Record<string, any>} values - 替换值
   * @returns {ComputedRef<string>} 响应式的翻译文本
   */
  const tr = (key: string, values: Record<string, any> = {}) => {
    return computed(() => translateText(key, values));
  };

  return {
    t,
    tr,
    locale,
    setLocale
  };
}
