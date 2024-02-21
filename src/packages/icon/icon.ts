import icons from '@/icons/iconfont'

/**
 * 所有图标类型
 */

export type IconTypes = (typeof icons)[number]['font_class']

/**
 * @description: 组件props类型
 */
export interface PropsType {
  icon: IconTypes
  size?: number
  color?: string
  primary?: boolean
}
