import { baseProps, type BaseProps } from '@/utils'
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  modelValue?: string | null
}
/**
 * @description: 组件props默认值
 */
export const defaultProps = baseProps<PropsType>({})
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  (e: 'update:modelValue', data: string): void
}

/**
 * 获取内部专属key值
 * @param el 组件
 * @param key t-group:是否支持group，_value:子组件标记值
 * @returns
 */
export function _getAttribute(el: Element, key: 't-group' | '_value') {
  return el.getAttribute(key)
}
