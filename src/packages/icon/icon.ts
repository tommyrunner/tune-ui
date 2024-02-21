import icons from '@/icons/iconfont'

/**
 * 所有图标类型
 */

export type IconTypes = (typeof icons)[number]['font_class']

/**
 * @description: Icon组件props类型
 */
export interface IconPropsType {
  icon: IconTypes
  size?: number
  color?: string
  primary?: boolean
}
/**
 * @description: Icon组件props默认值
 */
export const defaultProps: IconPropsType = {
  size: 16,
  icon: 'success-to'
}
