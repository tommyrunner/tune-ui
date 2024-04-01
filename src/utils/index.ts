import { configOptions } from '@/hooks/useOptions'
import { ElSizeType } from '@/types'

/**
 * @description: 组件的基本props属性
 */
export interface BaseProps {
  size?: ElSizeType
}

/**
 * @description: 初始化组件的基本props属性
 */
export function baseProps<T>(props: T) {
  return {
    size: configOptions.value.elSize,
    ...props
  }
}
