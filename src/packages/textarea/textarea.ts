import { type BaseProps } from '@/types'
import { IconTypes } from '../icon/icon'
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  modelValue?: string
  placeholder?: string
  tip?: string
  isTipe?: boolean
  clearable?: boolean
  // 开始icon
  prefixIcon?: IconTypes
  password?: boolean
  maxlength?: number
  // 加载按钮状态
  loading?: boolean
  // 按钮圆角
  radius?: 'default' | 'square'
  // 自定义颜色
  onBgColor?: string
  offBgColor?: string
  // 是否禁用
  disabled?: boolean
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 清空事件
  (e: 'clear'): void
}
