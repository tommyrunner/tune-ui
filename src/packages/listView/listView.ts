/**
 * 插槽参数
 */
export type ListSlotParamsType<T = any> = {
  row?: T;
  index?: number;
};

export interface VirtualConfigType<T = any> {
  // 固定item下标
  fixedIndex?: number;
  // 固定item中top位置值
  fixedTopValue?: number;
  // 额外传输值
  extra?: T;
}
/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 高度
  height?: number;
  // 是否虚拟列表
  isVirtualized?: boolean;
  // 数组
  listData?: any[];
  // 列表方向:row横向，row竖向(默认)
  direction?: "row" | "column";
  // 虚拟列表自定义参数(一般用来处理请求头)
  virtualConfig?: VirtualConfigType;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: "change"): void;
  // 视图变化监听
  (e: "resize"): void;
}
