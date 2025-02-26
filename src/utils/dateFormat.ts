/**
 * @description 日期格式化工具
 * 基于day.js实现，按需引入相关功能
 */
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 导入中文语言包
import customParseFormat from "dayjs/plugin/customParseFormat"; // 自定义解析格式
import localizedFormat from "dayjs/plugin/localizedFormat"; // 本地化格式
import advancedFormat from "dayjs/plugin/advancedFormat"; // 高级格式

// 加载插件
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(advancedFormat);

// 设置默认语言为中文
dayjs.locale("zh-cn");

/**
 * 格式化日期
 * @param date 日期对象、时间戳或日期字符串
 * @param format 格式化模板，默认为 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: Date | string | number, format: string = "YYYY-MM-DD"): string => {
  if (!date) return "";
  return dayjs(date).format(format);
};

/**
 * 解析日期字符串
 * @param dateString 日期字符串
 * @param format 解析格式
 * @returns 日期对象
 */
export const parseDate = (dateString: string, format?: string): Date => {
  if (format) {
    return dayjs(dateString, format).toDate();
  }
  return dayjs(dateString).toDate();
};

/**
 * 获取当前日期时间
 * @param format 格式化模板，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的当前日期时间
 */
export const getCurrentDateTime = (format: string = "YYYY-MM-DD HH:mm:ss"): string => {
  return dayjs().format(format);
};

/**
 * 日期格式化常量
 */
export const DATE_FORMATS = {
  /** 日期格式：年-月-日 */
  DATE: "YYYY-MM-DD",
  /** 时间格式：时:分:秒 */
  TIME: "HH:mm:ss",
  /** 日期时间格式：年-月-日 时:分:秒 */
  DATE_TIME: "YYYY-MM-DD HH:mm:ss",
  /** 短日期格式：年/月/日 */
  SHORT_DATE: "YYYY/MM/DD",
  /** 中文日期格式：年月日 */
  CN_DATE: "YYYY年MM月DD日",
  /** 中文日期时间格式：年月日 时分秒 */
  CN_DATE_TIME: "YYYY年MM月DD日 HH时mm分ss秒"
};

export default {
  formatDate,
  parseDate,
  getCurrentDateTime,
  DATE_FORMATS
}; 