import type { TipProps } from "@/hooks/useTip";
import type { BaseProps, ElSizeType } from "@/types";

/**
 * @description 数值类型定义
 */
export type ModelType = number | number[];

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType extends BaseProps, TipProps {
  /** 是否为范围输入 */
  isRange?: boolean;
  /** 计数器步长 */
  step?: number;
  /** 是否显示控制按钮 */
  isControls?: boolean;
  /** 最小值 */
  minValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 防抖回调函数 */
  debounce?: (data?: ModelType) => void;
  /** 防抖延迟时间(ms) */
  debounceDelay?: number;
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 清空事件 */
  clear: [];
  /** 失去焦点事件 */
  blur: [data?: ModelType];
  /** 获得焦点事件 */
  focus: [data?: ModelType];
  /** 回车事件 */
  enter: [data?: ModelType];
  /** 输入事件 */
  input: [data?: ModelType];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 数字输入框内容 */
  default?: () => any;
  /** 范围分隔符插槽 */
  spe?: () => any;
}

/**
 * @description 图标尺寸映射
 */
export const ICON_SIZES: Record<ElSizeType, number> = {
  default: 14,
  small: 14,
  large: 16
};
