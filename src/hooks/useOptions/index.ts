import { ref } from "vue";
import { OptionsResultType, OptionsThemeType, OptionsType } from "./type";
import { ElSizeType } from "@/types";
import { OptionsType as LoadingOptionsType } from "web-loading";

/**
 * 初始化全局配置api
 * @returns
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
    loadingOptions: {}
  };
}
// 全局配置，初始化一次
export const configOptions = ref<OptionsType>(initOptions());
/**
 * 抛出全局配置api
 * @returns OptionsResultType
 */
export function useOptions(): OptionsResultType {
  const updateThemeColor = (theme: OptionsThemeType) => {
    let updateTheme = Object.assign(configOptions.value.theme, theme) as Required<OptionsThemeType>;
    document.getElementsByTagName("body")[0].style.setProperty("--primary", updateTheme.primary);
    configOptions.value.theme = updateTheme;
  };
  const updateSize = (size: ElSizeType) => {
    configOptions.value.elSize = size;
  };
  const updateLoadingOptions = (options: LoadingOptionsType) => {
    configOptions.value.loadingOptions = options;
  };
  return { updateThemeColor, updateSize, updateLoadingOptions, configOptions, initOptions };
}
