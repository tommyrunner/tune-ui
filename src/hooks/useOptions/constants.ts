import { LOCALE_TYPE } from "./type";

/**
 * @description 默认语言
 * @constant {string}
 */
export const DEFAULT_LOCALE = LOCALE_TYPE.ZH_CN;

/**
 * @description 回退语言
 * @constant {string}
 */
export const FALLBACK_LOCALE = LOCALE_TYPE.EN_US;

/**
 * @description 支持的语言列表
 * @constant {string[]}
 */
export const SUPPORTED_LOCALES = [LOCALE_TYPE.ZH_CN, LOCALE_TYPE.EN_US];
