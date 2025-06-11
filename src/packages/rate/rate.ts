import type { BaseProps, ElSizeType } from "@/types";
import type { IconTypes } from "@/packages/icon/icon";

/**
 * @description 组件Props类型定义
 * @interface PropsType
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
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 评分改变事件 */
  change: [data?: number];
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 自定义评分内容 */
  default?: () => any;
}

/**
 * @description 图标尺寸配置
 */
export const ICON_SIZES: Record<ElSizeType, number> = {
  default: 16,
  small: 14,
  large: 18
};
