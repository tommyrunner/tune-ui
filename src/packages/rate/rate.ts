import { type BaseProps } from '@/types'
import { IconTypes } from '../icon/icon'
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  // 值定颜色 <= n
  color?: { [key in number]?: string }
  // 自定义icon
  icon?: {
    empty?: IconTypes
    half?: IconTypes
    show?: IconTypes
  }
  // 间隔
  gap?: number
  // 最大评分
  max?: number
  // 支持半选
  isHalf?: boolean
  // 是否禁用
  disabled?: boolean
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  (e: 'change', data?: number): void
}
