/**
 * @description 轮播组属性类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 容器高度 */
  height?: number;
  /** 容器宽度 */
  width?: number;
  /** 轮播间隔时间(ms) */
  delay?: number;
  /** 初始化下标 */
  initIndex?: number;
  /** 是否自动播放 */
  autoplay?: boolean;
  /** 轮播方向(true:前进,false:后退) */
  autoplayBack?: boolean;
  /** 鼠标悬停是否暂停 */
  pauseOnHover?: boolean;
  /** 是否开启切换动画 */
  animation?: boolean;
  /** 指示器触发方式 */
  trigger?: "hover" | "click" | "none";
  /** 切换箭头显示时机 */
  arrow?: "always" | "hover" | "none";
  /** 轮播方向 */
  direction?: "horizontal" | "vertical";
  /** 内容轮播方式 */
  toggle?: "vision" | "repeat" | "repeatedly" | "none";
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 切换事件 */
  change: [number?];
  /** 轮播监听 */
  autoplay: [number?];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 轮播内容区域 */
  default?: () => any;
}
