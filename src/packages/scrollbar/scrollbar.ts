// Scrollbar 组件类型
export type DirectionType = 'top' | 'left' | 'none'
/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 高度
  totalHeight?: number
  //   滚动条是否常驻
  permanent?: boolean
  // 列表方向:row横向，row竖向(默认)
  listDirection?: 'row' | 'column'
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: 'scrollX', listElement: HTMLElement): void
  (e: 'scrollY', listElement: HTMLElement): void
}
