import { type BaseProps } from '@/types'
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  // 占位符
  placeholder?: string
  // 是否范围
  isRange?: boolean
  // 是否展示输入提示
  isTipe?: boolean
  // 自定义提示
  tip?: string
  // 计数器步长
  step?: number
  // 是否使用控制按钮
  isControls?: boolean
  // 最大值
  minValue?: number
  // 最小值
  maxValue?: number
  // 是否禁用
  disabled?: boolean
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 清空事件
  (e: 'clear'): void
  (e: 'blur', data?: number | number[]): void
  (e: 'focus', data?: number | number[]): void
  // 用户回车触发
  (e: 'enter', data?: number | number[]): void
  (e: 'input', data?: number | number[]): void
}
