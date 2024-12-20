import { PropsType as ListViewItemPropsType } from "./listView-item";
/**
 * 插槽参数
 */
export type ListSlotParamsType<T = any> = {
  // 行数据
  row?: T;
  // 行下标
  index?: number;
  // 传递bind属性
  itemBind?: ListViewItemPropsType;
};

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 高度
  height?: number;
  // item高度
  itemMinHeight?: number;
  // 是否虚拟列表
  isVirtualized?: boolean;
  // 数组
  listData?: any[];
  // 列表方向:row横向，row竖向(默认)
  direction?: "row" | "column";
  // 虚拟列表的item需要固定高度 (TODO: 暂时使用固定高度实现虚拟列表)
  itemHeight?: number;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 切换事件
  (e: "scroll", params: HTMLElement): void;
  // 更新视图
  (e: "updateView", listElement: HTMLElement): void;
}
