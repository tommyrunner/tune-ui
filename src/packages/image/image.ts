/**
 * @description 图片适应容器的方式
 */
export type ImageFit = "fill" | "contain" | "cover" | "none" | "scale-down";

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 图片源地址 */
  src?: string;
  /** 图片适应容器的方式 */
  fit?: ImageFit;
  /** 是否开启懒加载 */
  lazy?: boolean;
  /** 预览图片列表 */
  previewSrcList?: string[];
  /** 初始预览图片索引 */
  initialIndex?: number;
  /** 是否可以通过按下 ESC 关闭预览 */
  closeOnPressEscape?: boolean;
  /** 预览时的z-index */
  zIndex?: number;
  /** 是否可以无限循环预览 */
  infinite?: boolean;
  /** 缩放速率 */
  zoomRate?: number;
  /** 最小缩放比例 */
  minScale?: number;
  /** 最大缩放比例 */
  maxScale?: number;
  /** 图片加载失败时的替代文本 */
  alt?: string;
  /** 原生 referrerPolicy 属性 */
  referrerPolicy?: ReferrerPolicy;
  /** 图片宽度 */
  width?: string | number;
  /** 图片高度 */
  height?: string | number;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 图片加载成功时触发 */
  load: [evt: Event];
  /** 图片加载失败时触发 */
  error: [evt: Event];
  /** 切换图片时触发 */
  switch: [index: number];
  /** 关闭预览时触发 */
  close: [];
  /** 显示预览时触发 */
  show: [];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 图片内容 */
  default?: () => any;
  /** 加载占位插槽 */
  placeholder?: () => any;
  /** 错误状态插槽 */
  error?: () => any;
}

/**
 * @description 组件暴露方法类型定义
 * @interface ExposesType
 */
export interface ExposesType {
  /** 显示预览 */
  showPreview: () => void;
}

/**
 * @description 图片组件状态类型定义
 * @interface ImageState
 */
export interface ImageState {
  /** 图片是否加载错误 */
  hasError: boolean;
  /** 图片是否已加载 */
  isLoaded: boolean;
  /** 图片是否正在加载 */
  loading: boolean;
  /** 是否显示预览 */
  showViewer: boolean;
  /** 图片原始宽度 */
  naturalWidth: number;
  /** 图片原始高度 */
  naturalHeight: number;
}
