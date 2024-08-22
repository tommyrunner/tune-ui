// Scrollbar 组件类型
export type DirectionType = 'top' | 'left'
/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 高度
  totalHeight?: number
  // 需要处理元素
  element?: HTMLElement
}
