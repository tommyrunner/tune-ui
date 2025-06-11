import type { TipProps } from "@/hooks/useTip";
import type { BaseProps, ElSizeType } from "@/types";

/**
 * @description 组件Props类型定义
 * @interface PropsType
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
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 清空事件 */
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
  /** 默认插槽 - 输入框内容 */
  default?: () => any;
  /** 前缀插槽 */
  prefix?: () => any;
}

/**
 * @description 图标尺寸映射
 */
export const ICON_SIZES: Record<ElSizeType, number> = {
  default: 14,
  small: 14,
  large: 16
};
