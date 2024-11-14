import { VNode } from "vue";

export interface SearchRenderScope<T = any> {
  // 行index
  rowIndex: number;
  // 列index
  colIndex: number;
  // 全列配置
  columns: TableColumnsType[];
  // 当前值
  value: any;
  // 当前配置
  rowCol: TableColumnsType;
  // 当前对象
  data: T;
}

export type TableColumnsType<T = any> = {
  // 是否是表头
  _Head?: boolean;
  prop: string;
  label: string;
  width?: number;
  fixed?: "left" | "right";
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
  // 数组
  columns?: TableColumnsType[];
  data?: any[];
  // 列表方向:row横向，row竖向(默认)
  direction?: "row" | "column";
  // 默认slot列表时的表头
  isDefSlotListHead?: boolean;
  headBgColor?: string;
  hoverBgColor?: string;
  border?: string;
  stripe?: string; // 斑马纹
  dbClickAutoWidth?: boolean; // 双击自动适配宽度
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: "change"): void;
}
