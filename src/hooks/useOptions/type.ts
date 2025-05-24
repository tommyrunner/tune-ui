// 1. 类型导入
import type { ElSizeType } from "@/types";
import type { Ref } from "vue";
import type { OptionsType as LoadingOptionsType } from "web-loading";

/**
 * @description 语言类型
 * @type {string}
 */
export enum LOCALE_TYPE {
  ZH_CN = "zh-CN",
  EN_US = "en-US"
}

/**
 * @description 全局主题配置
 * @interface OptionsThemeType
 */
export interface OptionsThemeType {
  /** 主要颜色 */
  primary?: string;
  /** 成功颜色 */
  success?: string;
  /** 警告颜色 */
  warning?: string;
  /** 危险颜色 */
  danger?: string;
  /** 信息颜色 */
  info?: string;
  /** 浅色 */
  light?: string;
  /** 深色 */
  dark?: string;
  /** 白色 */
  white?: string;
  /** 黑色 */
  black?: string;
  /** 灰色 */
  gray?: string;
  /** 边框颜色 */
  border?: string;
  /** 浅色边框 */
  borderLight?: string;
  /** 深色边框 */
  borderDark?: string;
  /** 白色边框 */
  borderWhite?: string;
  /** 黑色边框 */
  borderBlack?: string;
  /** 灰色边框 */
  borderGray?: string;
  /** 主色边框 */
  borderPrimary?: string;
}

/**
 * @description 全局配置
 * @interface OptionsType
 */
export interface OptionsType {
  /** 主题配置 */
  theme: OptionsThemeType;
  /** 元素默认尺寸 */
  elSize: ElSizeType;
  /** 加载配置选项 */
  loadingOptions?: LoadingOptionsType;
  /** 当前语言 */
  locale?: LOCALE_TYPE;
}

/**
 * @description 全局配置hooks操作返回
 * @interface OptionsResultType
 */
export interface OptionsResultType {
  /** 全局配置引用 */
  configOptions: Ref<OptionsType>;
  /** 基础尺寸引用 */
  baseSize: Ref<ElSizeType>;
  /** 初始化配置选项 */
  initOptions: () => OptionsType;
  /** 更新主题颜色 */
  updateThemeColor: (theme: OptionsThemeType) => void;
  /** 更新默认尺寸 */
  updateDefaultSize: (size: ElSizeType) => void;
  /** 更新加载配置 */
  updateLoadingOptions: (options: LoadingOptionsType) => void;
  /** 切换语言 */
  setLocale: (locale: LOCALE_TYPE) => void;
  /** 当前语言 */
  locale: Ref<LOCALE_TYPE>;
}
