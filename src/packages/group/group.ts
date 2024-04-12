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
  modelValue?: ValueType
  // 支持绑定对象
  data?: any[]
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
/**
 * 获取内部专属key值
 * @param el 组件
 * @param key t-group:是否支持group(同时可以判断当前子组件是否可用)，t-group-disabled:决定group是否可操作，_value:子组件标记值
 * @returns
 */
export function _getAttribute(el: Element, key: 't-group' | 't-group-disabled' | '_value'): ValueType {
  return el.getAttribute(key) || ''
}
