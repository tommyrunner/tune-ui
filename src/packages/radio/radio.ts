import { type BaseProps } from '@/utils'
import { IconTypes } from '../icon/icon'
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  radius?: 'default' | 'square'
  modelValue?: string | number | boolean
  disabled?: boolean
  name?: string
  value?: string
  icon?: IconTypes
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  (e: 'change', data: string | number | boolean): void
  (e: 'update:modelValue', data: string): void
}
