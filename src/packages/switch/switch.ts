import { type BaseProps } from "@/types";
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  // 加载按钮状态
  loading?: boolean;
  // 按钮圆角
  radius?: "default" | "square";
  // 自定义颜色
  onBgColor?: string;
  offBgColor?: string;
  // 是否禁用
  disabled?: boolean;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 点击事件
  (e: "change", data?: boolean): void;
}
