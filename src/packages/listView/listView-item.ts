import { IconTypes } from '../icon/icon'
/**
 * value 类型
 */
export type ValueType = string | number
/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 是否禁用
  disabled?: boolean
  // title
  title?: string
  // subtitle
  subtitle?: string
  // 状态值
  value?: ValueType
  // 自定义图表图形
  icon?: IconTypes
}
