import { IconTypes } from '../icon/icon'

export type ListDataType = {
  id: number
  // 是否禁用
  disabled?: boolean
  // title
  title?: string
  // subtitle
  subtitle?: string
  // 自定义图表图形
  icon?: IconTypes
}

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 高度
  height?: number
  // 是否虚拟列表
  isVirtualized?: boolean
  // 数组
  listData?: ListDataType[]
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: 'change'): void
}
