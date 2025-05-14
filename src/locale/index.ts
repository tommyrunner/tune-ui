import type { LocaleType } from "../hooks/useOptions/type";
import zhCN from "./zh-CN";
import enUS from "./en-US";

// 所有语言包
const messages: Record<string, Record<string, string>> = {
  "zh-CN": zhCN,
  "en-US": enUS
};

/**
 * 获取语言包
 * @param {LocaleType} locale - 语言类型
 * @returns {Record<string, string>} 语言包
 */
export const getMessages = (locale: LocaleType): Record<string, string> => {
  return messages[locale] || messages["zh-CN"] || {};
};

export default messages;
