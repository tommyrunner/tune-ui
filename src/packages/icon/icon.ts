import icons from "@/icons/iconfont";

/**
 * 图标组件属性类型定义
 */
export type IconTypes = (typeof icons.glyphs)[number]["font_class"];

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
