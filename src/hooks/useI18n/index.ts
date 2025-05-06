import { useOptions } from "../useOptions";
import type { I18nReturnType } from "./type";
import { getMessages } from "../../locale";

/**
 * i18n国际化钩子
 * @param {string} [namespace] - 命名空间，可选
 * @returns {I18nReturnType} 翻译函数和语言相关方法
 */
export function useI18n(namespace?: string): I18nReturnType {
  const { locale, setLocale } = useOptions();

  /**
   * 翻译函数
   * @param {string} key - 翻译键
   * @param {Record<string, any>} values - 替换值
   * @returns {string} 翻译后的文本
   */
  const t = (key: string, values: Record<string, any> = {}) => {
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
      result = result.replace(/\{(\w+)\}/g, (_, key) => {
        return values[key] !== undefined ? String(values[key]) : `{${key}}`;
      });
    }

    return result;
  };

  return {
    t,
    locale,
    setLocale
  };
}
export function test() {
  return "1";
}
