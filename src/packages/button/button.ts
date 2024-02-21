import { baseProps, type BaseProps } from '@/utils'
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
 * @description: 组件props默认值
 */
export const defaultProps = baseProps<PropsType>({
  type: 'default',
  loading: false,
  radius: 'default',
  disabled: false,
  scale: true
})
/**
 * emit
 */
export const emits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}
