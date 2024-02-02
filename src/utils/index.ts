import { configOptions } from '@/hooks/useOptions'
import { ElType, ElSizeType } from '@/types'

/**
 * @description: 组件的基本props属性
 */
export interface BaseProps {
  type?: ElType
  size?: ElSizeType
}

/**
 * @description: 初始化组件的基本props属性
 */
export function baseProps<T>(props: T) {
  return {
    type: configOptions.value.elType,
    size: configOptions.value.elSize,
    ...props
  }
}
