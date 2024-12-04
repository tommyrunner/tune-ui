import { StyleValue, VNode } from "vue";
// 筛选
export interface StateFilterType {
  label: string;
  value: any;
  checked?: boolean;
  // 类型 eq等于 lt小于 gt大于
  type: "eq" | "lt" | "gt";
}
// 排序
export interface StateSortType {
  sort: "none" | "asc" | "desc";
  prop: string;
}
/**
 * row数据类型
 */
export type TableRowType = any;
/**
 * 状态类型
 */
export interface StateType {
  isFixedLeft: boolean;
  isFixedRight: boolean;
  changeRows: TableRowType[];
  sortColProps: StateSortType[];
}
export interface SearchRenderScope<T = TableRowType> {
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
  // 是否是表头
  _Head?: boolean;
  prop: string;
  label: string;
  width?: number;
  fixed?: "left" | "right";
  children?: TableColumnsType<T>[];
  _group?: boolean;
  _fixedValue?: number;
  _fixedLast?: boolean;
  // 排序值
  sort?: number;
  sortable?: boolean; // 当前页排序
  filters?: StateFilterType[]; // 当前页筛选
  renderHead?: (scope: SearchRenderScope<T>) => VNode | string; // 自定义单元格内容渲染（tsx语法）
  render?: (scope: SearchRenderScope<T>) => VNode | string; // 自定义单元格内容渲染（tsx语法）
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
  headBgColor?: string;
  hoverBgColor?: string;
  border?: string;
  stripe?: string | boolean; // 斑马纹
  dbClickAutoWidth?: boolean; // 双击自动适配宽度
  changeRow?: "single" | "multiple" | "none"; // 是否开启选择行
  // 自定义行样式
  rowStyle?: <T = TableRowType>(row: T) => StyleValue;
  // 自定义当前页排序
  sortMethod?: <T = TableRowType>(data: { rowA: T; rowB: T }, config: StateSortType[]) => number;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: "change", params: any): void;
}
