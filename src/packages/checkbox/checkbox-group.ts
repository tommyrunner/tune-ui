import { type BaseProps } from '@/utils'

/**
 * value 类型
 */
export type ValueType = string | number | boolean | object
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  // 当前状态值
  modelValue?: ValueType[]
  // 绑定对象标记key
  objKey?: string
  // group类型
  type?: 'default' | 'text' | 'border' | 'button'
  // group方向
  direction?: 'column' | 'row'
  // 是否立即出发change
  immediateChange?: boolean
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: 'change', data?: ValueType): void
  // 值更新事件
  (e: 'update:modelValue', data?: ValueType): void
}
