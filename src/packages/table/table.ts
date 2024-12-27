import { StyleValue, VNode } from "vue";
import { TABLE_COL_GROUP, TABLE_COL_FIXED_VALUE, TABLE_COL_FIXED_LAST } from "./constants";
/**
 * 筛选配置类型
 */
export interface StateFilterType {
  label: string;
  value: any;
  checked?: boolean;
  // 类型 eq等于 lt小于 gt大于
  type: "eq" | "lt" | "gt";
}
/**
 * 排序配置类型
 */
export interface StateSortType {
  sort: "none" | "asc" | "desc";
  prop: string;
}
/**
 * row数据类型
 */
export type TableRowType = any;
/**
 * Node 元素
 */
export type TableRowVNode = VNode | string | number;
/**
 *  组件 state状态 类型
 */
export interface StateType {
  // 是否左固定列
  isFixedLeft: boolean;
  // 是否右固定列
  isFixedRight: boolean;
  // 是否上固定列
  isFixedTop: boolean;
  // 排序配置
  sortColProps: StateSortType[];
}
export interface ColumnRenderScope<T = TableRowType> {
  // 行index
  rowIndex: number;
  // 列index
  colIndex: number;
  // 全列配置
  columns: TableColumnsType<T>[];
  // 当前值
  value: T;
  // 当前配置
  rowCol: TableColumnsType;
  // 当前对象
  data: T;
}

export type TableColumnsType<T = TableRowType> = {
  // 列唯一key
  prop: string;
  // 列标题
  label: string;
  // 列宽度
  width?: number;
  // 固定列
  fixed?: "left" | "right";
  // 列子级(仅表头使用)
  children?: TableColumnsType<T>[];
  // 排序值
  sort?: number;
  // 当前页排序
  sortable?: boolean;
  // 当前页筛选
  filters?: StateFilterType[];
  // 自定义单元格内容渲染（tsx语法）
  renderHead?: (scope: ColumnRenderScope<T>) => TableRowVNode;
  // 自定义单元格内容渲染（tsx语法）
  render?: (scope: ColumnRenderScope<T>) => TableRowVNode;
  // 内部状态值
  [TABLE_COL_GROUP]?: boolean;
  [TABLE_COL_FIXED_VALUE]?: number;
  [TABLE_COL_FIXED_LAST]?: boolean;
};
//
/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 高度
  height?: number;
  // 是否虚拟列表
  isVirtualized?: boolean;
  // 虚拟列表item高度 36
  virtualizedItemHeight?: number;
  // 数组
  columns?: TableColumnsType[];
  data?: TableRowType[];
  // 列表方向:row横向，row竖向(默认)
  direction?: "row" | "column";
  // 默认slot列表时的表头
  isDefSlotListHead?: boolean;
  // 头部背景色
  headBgColor?: string;
  // 鼠标悬浮背景色
  hoverBgColor?: string;
  // 浮动行背景色
  fixedRowBgColor?: string;
  // 边框
  border?: string;
  // 斑马纹
  stripe?: string | boolean;
  // 双击自动适配宽度
  dbClickAutoWidth?: boolean;
  // 是否开启选择行 single: 单选，multiple: 多选，none: 无
  changeType?: "single" | "multiple" | "none";
  // 选中行key
  changeKey?: string;
  // 固定行(仅非虚拟列表)
  fixedIndexRow?: number;
  // 列合计
  summary?: boolean | ((summaryValue: number, scope: ColumnRenderScope) => TableRowVNode);
  // 自定义行样式
  rowStyle?: <T = TableRowType>(row: T, isFixed: boolean) => StyleValue;
  // 自定义当前页排序
  sortMethod?: <T = TableRowType>(data: { rowA: T; rowB: T }, config: StateSortType[]) => number;
  // 行内容扩展
  renderExtend?: <T = TableRowType>(row: T) => TableRowVNode;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: "checked", { row, data }: { row: TableRowType; data: TableRowType[] }): void;
  // 行点击事件
  (e: "clickRow", row: TableRowType): void;
}
