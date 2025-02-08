import type { BaseProps } from "@/types";
import type { IconTypes } from "@/packages/icon/icon";

/** 值类型定义 */
export type ValueType = string | number;

/**
 * Tabs组件的Props类型定义
 */
export interface PropsType extends BaseProps {
  /** 是否禁用 */
  disabled?: boolean;

  /** 选中值 */
  value?: ValueType;

  /** 自定义图标类型 */
  icon?: IconTypes;
}
