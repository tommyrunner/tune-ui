import { type BaseProps } from '@/utils'
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  modelValue?: string | number | boolean
  type?: 'text' | 'border' | 'button'
  direction?: 'column' | 'row'
  immediateChange?: boolean
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  (e: 'change', data: string | number | boolean): void
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
