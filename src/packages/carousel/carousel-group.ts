/**
 * 轮播组属性类型定义
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
 * 轮播组事件类型定义
 */
export interface EmitsType {
  /** 切换事件 */
  (e: "change", index?: number): void;
  /** 轮播监听 */
  (e: "autoplay", index?: number): void;
}
