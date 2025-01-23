import { ElSizeType } from "@/types";
/**
 * 全局配置
 */
export interface OptionsType {
  theme: OptionsThemeType;
  elSize: ElSizeType;
}
/**
 * 全局主题配置
 */
export interface OptionsThemeType {
  primary?: string;
  success?: string;
  warning?: string;
  danger?: string;
  info?: string;
  light?: string;
  dark?: string;
  white?: string;
  black?: string;
  gray?: string;
  border?: string;
  borderLight?: string;
  borderDark?: string;
  borderWhite?: string;
  borderBlack?: string;
  borderGray?: string;
  borderPrimary?: string;
}
/**
 * 全局配置hooks操作返回
 */
export interface OptionsResultType {
  updateThemeColor: (theme: OptionsThemeType) => void;
}

/**
 * 组件基础属性
 */
export interface PropsBaseType {
  size: ElSizeType;
}
