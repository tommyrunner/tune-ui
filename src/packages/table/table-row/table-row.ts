import type { TableColumnsType, TableRowType } from "../table";
import type { PropsType as ListViewItemPropsType } from "@/packages/listView/listView-item";

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
  // 是否尾部合计数据
  isFoot?: boolean;
  // 主要处理虚拟列表问题
  columns?: TableColumnsType[];
  // 默认背景色
  defBgColor?: string;
  // 鼠标浮动背景色
  hoverBgColor?: string;
  listItemBind?: ListViewItemPropsType;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: "click-row", params: TableRowType): void;
}
