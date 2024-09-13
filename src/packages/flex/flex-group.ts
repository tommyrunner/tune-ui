/**
 * @description: 组件props类型
 */
export type AlignmentTypes = "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
export interface PropsType {
  // 栅格间隔
  gap?: number;
  // 横向对齐方式
  align?: AlignmentTypes;
  // 竖向对齐方式
  justify?: AlignmentTypes;
}
