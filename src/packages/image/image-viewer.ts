/**
 * @description 图片预览器的操作类型
 */
export type ViewerAction = "zoomIn" | "zoomOut" | "clockwise" | "anticlockwise";

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 预览图片列表 */
  urlList: string[];
  /** 预览层级 */
  zIndex?: number;
  /** 初始预览索引 */
  initialIndex?: number;
  /** 是否支持循环预览 */
  infinite?: boolean;
  /** 缩放比率 */
  zoomRate?: number;
  /** 最小缩放比例 */
  minScale?: number;
  /** 最大缩放比例 */
  maxScale?: number;
  /** 是否传送到body */
  teleported?: boolean;
  /** 是否显示进度 */
  showProgress?: boolean;
  /** 是否支持ESC关闭 */
  closeOnPressEscape?: boolean;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 关闭事件 */
  close: [];
  /** 切换事件 */
  switch: [index: number];
  /** 旋转事件 */
  rotate: [deg: number];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 预览器内容 */
  default?: () => any;
  /** 工具栏插槽 */
  toolbar?: () => any;
  /** 进度插槽 */
  progress?: (props: { index: number; total: number }) => any;
}

/**
 * @description 组件暴露方法类型定义
 * @interface ExposesType
 */
export interface ExposesType {
  /** 设置当前活动项 */
  setActiveItem: (index: number) => void;
}

/**
 * @description 图片预览器的状态类型
 * @interface ViewerState
 */
export interface ViewerState {
  visible: boolean;
  currentIndex: number;
  scale: number;
  rotate: number;
  position: {
    x: number;
    y: number;
  };
  transform: {
    x: number;
    y: number;
  };
  isDragging: boolean;
  startPosition: {
    x: number;
    y: number;
  };
}

// 为了保持向后兼容，保留旧的类型别名
/** @deprecated 请使用 PropsType */
export type ViewerProps = PropsType;
/** @deprecated 请使用 EmitsType */
export type ViewerEmits = EmitsType;
