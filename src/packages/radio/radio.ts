import { type BaseProps } from '@/utils'
import { IconTypes } from '../icon/icon'
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  // 选中图形样式
  radius?: 'default' | 'square'
  // 当前状态值
  modelValue?: string | number | boolean
  // 是否禁用
  disabled?: boolean
  // 原生name值
  name?: string
  // 状态值
  value?: string
  // 自定义图表图形
  icon?: IconTypes
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 选择事件
  (e: 'change', data: string | number | boolean): void
  // 状态更新事件
  (e: 'update:modelValue', data: string): void
}
