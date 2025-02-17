import type { StyleValue, VNode } from "vue";
import type { TABLE_COL_GROUP, TABLE_COL_FIXED_VALUE, TABLE_COL_FIXED_LAST } from "./constants";
/**
 * 筛选配置类型
 */
export interface StateFilterType {
  /** 筛选项标签 */
  label: string;
  /** 筛选值 */
  value: any;
  /** 是否选中 */
  checked?: boolean;
  /** 筛选类型 */
  type: "eq" | "lt" | "gt";
}
/**
 * 排序配置类型
 */
export interface StateSortType {
  /** 排序方向 */
  sort: "none" | "asc" | "desc";
  /** 排序字段 */
  prop: string;
}
/**
 * row数据类型
 */
export type TableRowType = Record<string, any>;
/**
 * Node 元素
 */
export type TableRowVNode = VNode | string | number;
/**
 *  组件 state状态 类型
 */
export interface StateType {
  /** 是否有左固定列 */
  isFixedLeft: boolean;
  /** 是否有右固定列 */
  isFixedRight: boolean;
  /** 是否有顶部固定行 */
  isFixedTop: boolean;
  /** 排序配置列表 */
  sortColProps: StateSortType[];
}
export interface ColumnRenderScope<T = TableRowType> {
  /** 行索引 */
  rowIndex: number;
  /** 列索引 */
  colIndex: number;
  /** 列配置列表 */
  columns: TableColumnsType<T>[];
  /** 单元格值 */
  value: T;
  /** 当前列配置 */
  rowCol: TableColumnsType<T>;
  /** 行数据 */
  data: T;
}

export type TableColumnsType<T = TableRowType> = {
  /** 列标识 */
  prop: string;
  /** 列标题 */
  label: string;
  /** 列宽度 */
  width?: number;
  /** 固定列位置 */
  fixed?: "left" | "right";
  /** 子列配置 */
  children?: TableColumnsType<T>[];
  /** 排序值 */
  sort?: number;
  /** 是否可排序 */
  sortable?: boolean;
  /** 筛选配置 */
  filters?: StateFilterType[];
  /** 自定义表头渲染 */
  renderHead?: (scope: ColumnRenderScope<T>) => TableRowVNode;
  /** 自定义单元格渲染 */
  render?: (scope: ColumnRenderScope<T>) => TableRowVNode;
  /** 内部状态标记 */
  [TABLE_COL_GROUP]?: boolean;
  [TABLE_COL_FIXED_VALUE]?: number;
  [TABLE_COL_FIXED_LAST]?: boolean;
};
//
/**
 * @description: 组件props类型
 */
export interface PropsType {
  /** 表格高度 */
  height?: number;
  /** 是否开启虚拟滚动 */
  isVirtualized?: boolean;
  /** 虚拟滚动行高 */
  virtualizedItemHeight?: number;
  /** 列配置 */
  columns?: TableColumnsType[];
  /** 表格数据 */
  data?: TableRowType[];
  /** 是否使用默认插槽表头 */
  isDefSlotListHead?: boolean;
  /** 表头背景色 */
  headBgColor?: string;
  /** 鼠标悬浮背景色 */
  hoverBgColor?: string;
  /** 表格边框 */
  border?: string;
  /** 斑马纹 */
  stripe?: string | boolean;
  /** 是否支持双击自适应列宽 */
  dbClickAutoWidth?: boolean;
  /** 选择模式 */
  changeType?: "single" | "multiple" | "none";
  /** 选中标识字段 */
  changeKey?: string;
  /** 固定行方法 */
  fixedRow?: (index: number, row: TableRowType) => boolean;
  /** 合计行配置 */
  summary?: ((summaryValue: number, scope: ColumnRenderScope) => TableRowVNode) | boolean;
  /** 自定义行样式 */
  rowStyle?: (index: number, row: TableRowType) => StyleValue;
  /** 自定义排序方法 */
  sortMethod?: (data: { rowA: TableRowType; rowB: TableRowType }, config: StateSortType[]) => number;
  /** 行扩展内容 */
  renderExtend?: (row: TableRowType) => TableRowVNode;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  /** 选中事件 */
  (e: "checked", { row, data }: { row: TableRowType; data: TableRowType[] }): void;
  /** 行点击事件 */
  (e: "click-row", row: TableRowType): void;
}
