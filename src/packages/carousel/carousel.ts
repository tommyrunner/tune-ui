import type { IconTypes } from '../icon/icon'
/**
 * value 类型
 */
export type ValueType = string | number | boolean
/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 绑定值
  value?: ValueType
  // 标题
  title?: string
  // icon
  rightIcon?: IconTypes
  disabled?: boolean
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 选择事件
  (e: 'change', data?: ValueType): void
}
