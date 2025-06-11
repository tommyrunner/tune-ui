import type { ElSizeType, BaseProps } from "@/types";

/**
 * @description 颜色选择器尺寸
 */
export type ColorPickerSize = "small" | "default" | "large";

/**
 * @description 颜色格式
 */
export type ColorFormat = "hex" | "rgb" | "rgba";

/**
 * @description ColorPicker组件Props类型定义
 * @interface PropsType
 * @extends {BaseProps}
 */
export interface PropsType extends BaseProps {
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否支持透明度选择 */
  showAlpha?: boolean;
  /** 写入v-model的颜色的格式 */
  colorFormat?: "hsl" | "hsv" | "hex" | "rgb";
  /** ColorPicker下拉框的类名 */
  popperClass?: string;
  /** 预定义颜色 */
  predefine?: string[];
  /** 输入时是否触发表单的校验 */
  validateEvent?: boolean;
  /** ColorPicker的tabindex */
  tabindex?: string | number;
  /** 是否将popover的下拉列表渲染至body下 */
  teleported?: boolean;
}

/**
 * @description ColorPicker组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 当绑定值变化时触发 */
  change: [string];
  /** 面板中当前显示的颜色发生改变时触发 */
  "active-change": [string];
  /** 当获得焦点时触发 */
  focus: [FocusEvent];
  /** 当失去焦点时触发 */
  blur: [FocusEvent];
}

/**
 * @description ColorPicker组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 用于自定义触发器内容 */
  default?: () => any;
}

/**
 * @description 不同尺寸对应的图标大小映射
 */
export const ICON_SIZES: Record<ElSizeType, number> = {
  default: 14,
  small: 12,
  large: 16
};

/**
 * @description 颜色选择器面板尺寸映射
 */
export const PANEL_SIZES: Record<ElSizeType, number> = {
  default: 280,
  small: 240,
  large: 320
};
