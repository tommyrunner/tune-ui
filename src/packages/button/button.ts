import { type BaseProps } from '@/utils'
import type { IconTypes } from '../icon/icon'
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text'
  startIcon?: IconTypes
  endIcon?: IconTypes
  loading?: boolean
  radius?: 'default' | 'round' | 'circle'
  color?: string
  disabled?: boolean
  scale?: boolean
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  (e: 'click', data: MouseEvent): void
}
