import type { TipProps } from "@/hooks/useTip";

/**
 * 文本域组件属性类型定义
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
 * 文本域组件事件类型定义
 */
export interface EmitsType {
  /** 清除事件 */
  (e: "clear"): void;
  /** 失去焦点事件 */
  (e: "blur", data?: string): void;
  /** 获得焦点事件 */
  (e: "focus", data?: string): void;
  /** 回车事件 */
  (e: "enter", data?: string): void;
  /** 输入事件 */
  (e: "input", data?: string): void;
}
