import { baseProps, type BaseProps } from '@/utils'
import { IconTypes } from '../icon/icon'
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  radius?: 'default' | 'square'
  modelValue?: any
  disabled?: boolean
  name?: string
  value?: string
  icon?: IconTypes
}
/**
 * @description: 组件props默认值
 */
export const defaultProps = baseProps<PropsType>({
  radius: 'default',
  disabled: false
})
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  (e: 'click', data: MouseEvent): void
  (e: 'update:modelValue', data: string): void
}
