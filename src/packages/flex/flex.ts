/**
 * Flex组件属性类型定义
 */
export type AlignmentTypes = "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";

export interface PropsType {
  /** 栅格占比(0-10) */
  span?: number;
  /** 栅格左侧偏移格数 */
  offset?: number;
  /** 元素排序值 */
  sort?: number;
  /** 响应式布局 - 小屏 <768px */
  xs?: number;
  /** 响应式布局 - 中小屏 ≥768px */
  sm?: number;
  /** 响应式布局 - 中屏 ≥992px */
  md?: number;
  /** 响应式布局 - 大屏 ≥1200px */
  lg?: number;
  /** 响应式布局 - 超大屏 ≥1920px */
  xl?: number;
}
