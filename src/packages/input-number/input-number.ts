import type { TipProps } from "@/hooks/useTip";
import type { BaseProps, ElSizeType } from "@/types";
/**
 * @description: 组件props类型
 */
export type ModelType = number | number[];
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
 * @description: 组件emit类型
 */
export interface EmitsType {
  /** 清空事件 */
  (e: "clear"): void;
  /** 失去焦点事件 */
  (e: "blur", data?: ModelType): void;
  /** 获得焦点事件 */
  (e: "focus", data?: ModelType): void;
  /** 回车事件 */
  (e: "enter", data?: ModelType): void;
  /** 输入事件 */
  (e: "input", data?: ModelType): void;
}
/**
 * @description 图标尺寸映射
 */
export const ICON_SIZES: Record<ElSizeType, number> = {
  default: 14,
  small: 14,
  large: 16
};
