import { baseProps, type BaseProps } from '@/utils'
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  modelValue?: string | null
  type?: 'text' | 'border' | 'button'
  direction?: 'column' | 'row'
}
/**
 * @description: 组件props默认值
 */
export const defaultProps = baseProps<PropsType>({
  direction: 'row'
})
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  (e: 'update:modelValue', data: string): void
}

/**
 * 获取内部专属key值
 * @param el 组件
 * @param key t-group:是否支持group(同时可以判断当前子组件是否可用)，_value:子组件标记值
 * @returns
 */
export function _getAttribute(el: Element, key: 't-group' | '_value') {
  return el.getAttribute(key)
}
