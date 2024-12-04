import { TableColumnsType, TableRowType } from "../table";

/**
 * @description: 组件props类型
 */
export interface PropsType {
  row: TableRowType;
  rowIndex?: number;
  isHead?: boolean;

  // 主要处理虚拟列表问题
  columns?: TableColumnsType[];
  defBgColor?: string;
  hoverBgColor?: string;
  // 内部虚拟列表配置
  _virtualConfig?: {
    // 是否虚拟列表
    isVirtualized?: boolean;
  };
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: "change", params: TableRowType[]): void;
}
