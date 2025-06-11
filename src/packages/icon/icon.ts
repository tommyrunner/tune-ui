import icons from "@/icons/iconfont";

/**
 * @description 图标类型定义
 */
export type IconTypes = (typeof icons.glyphs)[number]["font_class"];

/**
 * @description 组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 图标名称 */
  icon: IconTypes;
  /** 自定义图标名称 */
  customIcon?: string;
  /** 图标大小(px) */
  size?: number;
  /** 图标颜色 */
  color?: string;
  /** 图标类型 */
  type?: "default" | "primary" | "success" | "info" | "warning" | "danger";
}

/**
 * @description 组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  // 该组件无事件
}

/**
 * @description 组件插槽类型定义
 * @interface SlotsType
 */
export interface SlotsType {
  /** 默认插槽 - 图标内容 */
  default?: () => any;
}
