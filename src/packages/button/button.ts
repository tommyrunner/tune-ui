import { baseProps, BaseProps } from '@/utils'

/**
 * @description: Button组件props类型
 */
export interface ButtonPropsType extends BaseProps {
  startIcon?: string
  endIcon?: string
  radius: 'default' | 'round' | 'circle'
}
/**
 * @description: Button组件props默认值
 */
export const defaultProps = baseProps<ButtonPropsType>({
  radius: 'default'
})
