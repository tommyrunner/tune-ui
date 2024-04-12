/**
 * @description: 组件props类型
 */
export type AlignmentTypes = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
export interface PropsType {
  // 栅格占据
  spans: number[]
  // TODO: 实现竖向响应式
  // 栅格间隔
  gap?: number
  // 横向对齐方式
  align?: AlignmentTypes
  // 竖向对齐方式
  justify?: AlignmentTypes
  // 栅格左侧的间隔格数
  offset?: number[]
  // 子元素 display 状态
  itemDisplay?: string
  // 元素排序
  sort?: number[]
  // 响应式布局 <768px
  xs?: number[]
  // 响应式布局 ≥768px
  sm?: number[]
  // 响应式布局 <768px
  md?: number[]
  // 响应式布局 ≥992px
  lg?: number[]
  // 响应式布局 ≥1920px
  xl?: number[]
}
