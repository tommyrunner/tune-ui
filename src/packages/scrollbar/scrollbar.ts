// Scrollbar 组件类型
export type DirectionType = 'top' | 'left'
/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 高度
  totalHeight?: number
  //   滚动条是否常驻
  permanent?: boolean
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: 'scrollX', listElement: HTMLElement): void
  (e: 'scrollY', listElement: HTMLElement): void
}
