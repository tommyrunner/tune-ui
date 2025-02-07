/**
 * Flex布局组属性类型定义
 */
export type AlignmentTypes = "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";

export interface PropsType {
  /** 栅格间隔(px) */
  gap?: number;
  /** 水平对齐方式 */
  align?: AlignmentTypes;
  /** 垂直对齐方式 */
  justify?: AlignmentTypes;
}
