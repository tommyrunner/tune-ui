import type { BaseProps, ElSizeType } from "@/types";
import type { IconTypes } from "@/packages/icon/icon";
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  /** 评分颜色配置 key为分值 */
  color?: { [key in number]?: string };
  /** 自定义图标配置 */
  icon?: {
    /** 未选中图标 */
    empty?: IconTypes;
    /** 半选图标 */
    half?: IconTypes;
    /** 选中图标 */
    show?: IconTypes;
  };
  /** 图标间距 */
  gap?: number;
  /** 最大评分值 */
  max?: number;
  /** 是否支持半选 */
  isHalf?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  /** 评分改变事件 */
  (e: "change", data?: number): void;
}
/** 图标尺寸配置 */
export const ICON_SIZES: Record<ElSizeType, number> = {
  default: 16,
  small: 14,
  large: 18
};
