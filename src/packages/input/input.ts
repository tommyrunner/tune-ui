import { type BaseProps } from '@/types'
import { IconTypes } from '../icon/icon'
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
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
  // 是否禁用
  disabled?: boolean
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 清空事件
  (e: 'clear'): void
  (e: 'blur', data?: string): void
  (e: 'focus', data?: string): void
  // 用户回车触发
  (e: 'enter', data?: string): void
  (e: 'input', data?: string): void
  // 防抖事件
  (e: 'debounce', data?: string): void
}
