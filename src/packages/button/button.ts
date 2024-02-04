import { baseProps, BaseProps } from '@/utils'

/**
 * @description: Button组件props类型
 */
export interface ButtonPropsType extends BaseProps {
  type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text'
  startIcon?: string
  endIcon?: string
  loading?: boolean
  radius?: 'default' | 'round' | 'circle'
  color?: string
  disabled?: boolean
}
/**
 * @description: Button组件props默认值
 */
export const defaultProps = baseProps<ButtonPropsType>({
  type: 'default',
  loading: false,
  radius: 'default',
  disabled: false
})
