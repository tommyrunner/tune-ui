import icons from "@/icons/iconfont";

/**
 * 所有图标类型
 */

export type IconTypes = (typeof icons.glyphs)[number]["font_class"];

/**
 * @description: 组件props类型
 */
export interface PropsType {
  icon: IconTypes;
  customIcon?: string;
  size?: number;
  color?: string;
  type?: "default" | "primary" | "success" | "info" | "warning" | "danger";
}
