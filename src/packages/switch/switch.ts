import type { BaseProps } from "@/types";
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  /** 是否加载中 */
  loading?: boolean;
  /** 按钮圆角类型 */
  radius?: "default" | "square";
  /** 开启状态背景色 */
  onBgColor?: string;
  /** 关闭状态背景色 */
  offBgColor?: string;
  /** 是否禁用 */
  disabled?: boolean;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  /** 状态改变事件 */
  (e: "change", data?: boolean): void;
}
