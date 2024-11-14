import { TableColumnsType } from "../table";

/**
 * @description: 组件props类型
 */
export interface PropsType {
  col: TableColumnsType;
  colIndex?: number;

  // 主要处理虚拟列表问题
  columns?: TableColumnsType[];
}
