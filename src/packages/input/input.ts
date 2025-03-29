import type { TipProps } from "@/hooks/useTip";
import type { BaseProps } from "@/types";
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps, TipProps {
  /** 是否显示清空按钮 */
  clearable?: boolean;
  /** 是否为密码输入框 */
  password?: boolean;
  /** 最大输入长度 */
  maxLength?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 防抖事件回调 */
  debounce?: (data?: string) => void;
  /** 防抖延迟时间(ms) */
  debounceDelay?: number;
  /** 自动补全 */
  autocomplete?: "off" | "on";
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  /** 清空事件 */
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
