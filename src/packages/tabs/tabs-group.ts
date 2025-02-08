import type { ValueType } from "./tabs";

/**
 * TabsGroup组件的Props类型定义
 */
export interface PropsType {
  /** 标签页类型 */
  type?: "line" | "block" | "border";

  /** 标签页高度 */
  height?: string;

  /** 标签页间距(为0充满父元素) */
  gap?: number;

  /** 是否显示关闭按钮 */
  isClose?: boolean;

  /** 切换动画时长(毫秒) */
  actionDuration?: number;
}

/**
 * TabsGroup组件的事件类型定义
 */
export interface EmitsType {
  /** 切换事件 */
  (e: "change", data?: ValueType): void;
  /** 关闭事件 */
  (e: "close", data?: ValueType): void;
}
