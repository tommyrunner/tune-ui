/**
 * @description: 组件props类型
 */
export type AlignmentTypes = "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
export interface PropsType {
  // 栅格占据
  span?: number;
  // 栅格左侧的间隔格数
  offset?: number;
  // 元素排序
  sort?: number;
  // 响应式布局 <768px
  xs?: number;
  // 响应式布局 ≥768px
  sm?: number;
  // 响应式布局 ≥992px
  md?: number;
  // 响应式布局 ≥1200px
  lg?: number;
  // 响应式布局 ≥1920px
  xl?: number;
}
