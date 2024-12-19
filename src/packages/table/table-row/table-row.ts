import { TableColumnsType, TableRowType } from "../table";

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 行数据
  row: TableRowType;
  // 行下标
  rowIndex?: number;
  // 是否头部数据
  isHead?: boolean;
  // 主要处理虚拟列表问题
  columns?: TableColumnsType[];
  // 默认背景色
  defBgColor?: string;
  // 鼠标浮动背景色
  hoverBgColor?: string;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: "clickRow", params: TableRowType): void;
}
