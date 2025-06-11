import type { StyleValue, VNode } from "vue";
import type { TABLE_COL_GROUP, TABLE_COL_FIXED_VALUE, TABLE_COL_FIXED_LAST } from "./constants";
/**
 * @description 筛选配置类型
 * @interface StateFilterType
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
 * @description 排序配置类型
 * @interface StateSortType
 */
export interface StateSortType {
  /** 排序方向 */
  sort: "none" | "asc" | "desc";
  /** 排序字段 */
  prop: string;
}
/**
 * @description row数据类型
 */
export type TableRowType = Record<string, any>;
/**
 * @description Node 元素
 */
export type TableRowVNode = VNode | string | number;
/**
 * @description  组件 state状态 类型
 * @interface StateType
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
/**
 * @description 列渲染作用域类型
 * @interface ColumnRenderScope
 */
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

/**
 * @description 表格列配置类型
 */
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
 * @description 组件Props类型定义
 * @interface PropsType
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
  /** 表尾背景色 */
  footBgColor?: string;
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
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 选中事件 */
  checked: [params: { row: TableRowType; data: TableRowType[] }];
  /** 行点击事件 */
  "click-row": [row: TableRowType];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 表格内容 */
  default?: (scope: ColumnRenderScope) => any;
  /** 表头插槽 */
  head?: () => any;
  /** 表尾插槽 */
  footer?: () => any;
}

/**
 * @description 组件暴露方法类型定义
 * @interface ExposesType
 */
export interface ExposesType {
  /** 自动调整列宽度 */
  autoColWidth: (prop: string) => void;
}
