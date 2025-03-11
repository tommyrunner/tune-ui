/**
 * @description 图片预览器的操作类型
 */
export type ViewerAction = "zoomIn" | "zoomOut" | "clockwise" | "anticlockwise";

/**
 * @description 图片预览器的属性类型
 */
export interface ViewerProps {
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
 * @description 图片预览器的事件类型
 */
export interface ViewerEmits {
  /** 关闭事件 */
  (e: "close"): void;
  /** 切换事件 */
  (e: "switch", index: number): void;
  /** 旋转事件 */
  (e: "rotate", deg: number): void;
}

/**
 * @description 图片预览器的状态类型
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