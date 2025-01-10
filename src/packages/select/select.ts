import { type BaseProps } from "@/types";

// 组件默认容器圆角
export const contentRadius = 6;

/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  // 选择显示类型
  type?: "input" | "text";
  // 显示文本提示文字
  textLabel?: string;
  // 占位符
  placeholder?: string;
  // 是否展示输入提示
  isTip?: boolean;
  // 自定义提示
  tip?: string;
  // 是否清空
  clearable?: boolean;
  // 是否禁用
  disabled?: boolean;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 清空事件
  (e: "clear"): void;
  (e: "blur", data?: string): void;
  (e: "focus", data?: string): void;
  // 用户回车触发
  (e: "enter", data?: string): void;
  (e: "input", data?: string): void;
}
