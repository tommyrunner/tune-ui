import { IconTypes } from '../icon/icon'

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 触发滚动对象
  target?: HTMLElement | string
  // 分隔icon
  icon?: IconTypes
  // icon大小
  iconSize?: number
  // bottom
  bottom?: string
  // right
  right?: string
  // 滚动到底差异值
  visibilityHeight?: number
  // 是否纯色
  plain?: boolean
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 选择事件
  (e: 'click'): void
}
