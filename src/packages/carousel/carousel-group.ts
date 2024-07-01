import { ValueType } from './carousel'

/**
 * @description: 组件props类型
 */
export interface PropsType {
  height?: number
  width?: number
  behavior?: ScrollBehavior
  toggle?: 'vision' | 'repeat' | 'repeatedly' | 'none' // vision:视觉差,repeat:重复,repeatedly:反复,none:不循环
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: 'change', data?: ValueType[]): void
}
