import { type BaseProps } from "@/types";
import type { ElSizeType } from "@/types";

/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  /** 标签类型 */
  type?: "default" | "primary" | "success" | "info" | "warning" | "danger";
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 是否圆角 */
  round?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  /** 关闭事件 */
  (e: "close"): void;
}

// 不同尺寸对应的图标大小
export const ICON_SIZES: Record<ElSizeType, number> = {
  default: 12,
  small: 8,
  large: 14
};
