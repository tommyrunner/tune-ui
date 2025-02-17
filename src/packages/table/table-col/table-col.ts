import type { TableColumnsType } from "../table";

/**
 * @description: 组件props类型
 */
export interface PropsType {
  /** 列配置 */
  col: TableColumnsType;
  /** 列索引 */
  colIndex?: number;
}
