import { RouteRecordRaw } from 'vue-router'
import { IconTypes } from '../icon/icon'

/**
 * value 类型
 */
export type ValueType = {
  label?: string
  value?: string
  // 图标
  icon?: IconTypes
  // 跳转路径
  to?: RouteRecordRaw
  // 进制跳转
  disabled?: boolean
}
/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 是否router跳转
  isRouter?: boolean
  // 如果设置该属性为 true, 导航将不会留下历史记录
  isReplace?: boolean
  // 分隔icon
  separatedIcon?: IconTypes
  // 间距
  gap?: number
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 选择事件
  (e: 'change', data?: ValueType): void
}
