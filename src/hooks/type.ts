import { ElSizeType } from '@/types'
export interface OptionsType {
  theme: OptionsThemeType
  elSize: ElSizeType
}

export interface OptionsThemeType {
  primary?: string
  success?: string
  warning?: string
  danger?: string
  info?: string
  light?: string
  dark?: string
  white?: string
  black?: string
  gray?: string
  border?: string
  borderLight?: string
  borderDark?: string
  borderWhite?: string
  borderBlack?: string
  borderGray?: string
  borderPrimary?: string
}

export interface OptionsResultType {
  updateThemeColor: (theme: OptionsThemeType) => void
}

export interface PropsBaseType {
  type: ElType
  size: ElSizeType
}
