import type { BaseProps, ElSizeType } from "@/types";
import type { OptionsResultType, OptionsThemeType, OptionsType, LOCALE_TYPE } from "./type";
import type { OptionsType as LoadingOptionsType } from "web-loading";
import { computed, ref } from "vue";
import { DEFAULT_LOCALE } from "./constants";

// 全局配置，初始化一次
export const configOptions = ref<OptionsType>(initOptions());
/**
 * 初始化全局配置api
 * @returns {OptionsType} 初始化的配置选项
 */
export function initOptions(): OptionsType {
  return {
    theme: {
      primary: "#1890ff",
      success: "#52c41a",
      warning: "#faad14",
      danger: "#f5222d",
      info: "#108ee9",
      dark: "#1890ff",
      light: "#fff"
    },
    elSize: "default",
    loadingOptions: {
      text: "loading..."
    },
    locale: DEFAULT_LOCALE
  };
}

/**
 * 抛出全局配置api
 * @param {BaseProps} props - 组件props(可选，用于获取组件默认props属性)
 * @returns {OptionsResultType} 配置操作方法和状态
 */
export function useOptions(props?: BaseProps): OptionsResultType {
  /**
   * 更新主题色
   * @param {OptionsThemeType} theme - 主题配置
   */
  const updateThemeColor = (theme: OptionsThemeType) => {
    let updateTheme = Object.assign(configOptions.value.theme, theme) as Required<OptionsThemeType>;
    Object.keys(updateTheme).forEach(key => {
      document.getElementsByTagName("body")[0].style.setProperty(`--${key}`, updateTheme[key]);
    });
    configOptions.value.theme = updateTheme;
  };

  /**
   * 更新默认尺寸
   * @param {ElSizeType} size - 尺寸类型
   */
  const updateDefaultSize = (size: ElSizeType) => {
    configOptions.value.elSize = size;
  };

  /**
   * 更新loading配置
   * @param {LoadingOptionsType} options - loading配置选项
   */
  const updateLoadingOptions = (options: LoadingOptionsType) => {
    configOptions.value.loadingOptions = options;
  };

  /**
   * 切换语言
   * @param {LocaleType} locale - 目标语言
   */
  const setLocale = (locale: LOCALE_TYPE) => {
    configOptions.value.locale = locale;
  };

  /**
   * 获取基础尺寸
   */
  const baseSize = computed(() => props?.size || configOptions.value.elSize);

  /**
   * 获取当前语言
   */
  const locale = computed(() => configOptions.value.locale || DEFAULT_LOCALE);

  return {
    updateThemeColor,
    updateDefaultSize,
    updateLoadingOptions,
    setLocale,
    initOptions,
    configOptions,
    baseSize,
    locale
  };
}
