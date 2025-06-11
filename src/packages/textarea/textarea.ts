import type { TipProps } from "@/hooks/useTip";

/**
 * @description 组件Props类型定义
 * @interface PropsType
 * @extends {TipProps}
 */
export interface PropsType extends TipProps {
  /** 最大输入长度 */
  maxLength?: number;
  /** 是否显示当前光标所在行数 */
  isCursor?: boolean;
  /** 是否允许调整大小 */
  isResize?: boolean;
  /** 是否允许换行输入 */
  isEnter?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 防抖事件回调 */
  debounce?: (data?: string) => void;
  /** 防抖延迟时间(ms) */
  debounceDelay?: number;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 清除事件 */
  clear: [];
  /** 失去焦点事件 */
  blur: [data?: string];
  /** 获得焦点事件 */
  focus: [data?: string];
  /** 回车事件 */
  enter: [data?: string];
  /** 输入事件 */
  input: [data?: string];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 文本域内容 */
  default?: () => any;
}
