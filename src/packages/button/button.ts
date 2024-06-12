import { type BaseProps } from '@/types'
import type { IconTypes } from '../icon/icon'
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  // 按钮类型
  type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text'
  // 开始icon
  prefixIcon?: IconTypes
  // 结束icon
  suffixIcon?: IconTypes
  // 加载按钮状态
  loading?: boolean
  // 按钮圆角
  radius?: 'default' | 'round' | 'circle'
  // 按钮自定义颜色
  color?: string
  // 是否禁用
  disabled?: boolean
  // 是否缩放
  scale?: boolean
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 点击事件
  (e: 'click', data: MouseEvent): void
}
