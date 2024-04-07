import { type BaseProps } from '@/utils'
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  // 当前状态值
  modelValue?: string | number | boolean
  // group类型
  type?: 'text' | 'border' | 'button'
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
  (e: 'change', data: string | number | boolean): void
  // 值更新事件
  (e: 'update:modelValue', data: string): void
}
/**
 * 获取内部专属key值
 * @param el 组件
 * @param key t-group:是否支持group(同时可以判断当前子组件是否可用)，_value:子组件标记值
 * @returns
 */
export function _getAttribute(el: Element, key: 't-group' | '_value'): string | number | boolean {
  return el.getAttribute(key) || ''
}
