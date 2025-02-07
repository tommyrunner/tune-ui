import type { IconTypes } from "@/packages/icon/icon";

/**
 * 卡片组件属性类型定义
 */
export interface PropsType {
  /** 阴影显示时机 */
  shadow?: "always" | "hover" | "never";
  /** 卡片标题 */
  title?: string;
  /** 标题图标 */
  titleIcon?: IconTypes;
}
