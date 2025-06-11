/**
 * @description 列表项插槽参数类型
 */
export type ListSlotParamsType<T = any> = {
  /** 行数据 */
  row?: T;
  /** 行下标 */
  index?: number;
};

/**
 * @description 列表项数据类型
 */
export type ListItemType<T = any> = {
  /** 行数据 */
  row?: T;
  /** 行下标 */
  index?: number;
  /** 项目高度 */
  height?: number;
  /** 定位位置 */
  top?: number;
};

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 列表容器高度 */
  height?: number;
  /** 是否启用虚拟滚动 */
  isVirtualized?: boolean;
  /** 列表数据源 */
  listData?: any[];
  /** 虚拟列表项固定高度 */
  itemHeight?: number;
  /** 固定项判断函数 */
  itemFixed?: (index: number, row: any) => boolean;
  /** 空数据提示文本 */
  emptyText?: string;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 滚动事件 */
  scroll: [element: HTMLElement];
  /** 视图更新事件 */
  "update-view": [element: HTMLElement];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 列表项内容 */
  default?: (params: ListSlotParamsType) => any;
  /** 头部插槽 */
  head?: () => any;
  /** 尾部插槽 */
  footer?: () => any;
  /** 空数据插槽 */
  empty?: () => any;
}

/**
 * @description 组件暴露方法类型定义
 * @interface ExposesType
 */
export interface ExposesType {
  /** 滚动到指定项目 */
  scrollToItem: (top: number, behavior?: ScrollBehavior) => void;
}
