import { type BaseProps } from "@/types";
/**
 * @description: 组件props类型
 */
export interface PropsType extends BaseProps {
  // 占位符
  placeholder?: string;
  // 是否展示输入提示
  isTipe?: boolean;
  // 自定义提示
  tip?: string;
  // 是否清空
  clearable?: boolean;
  // 是否是密码框
  password?: boolean;
  // 最大长度
  maxlength?: number;
  // 是否禁用
  disabled?: boolean;
  // 防抖事件
  debounce?: (data?: string) => void | Function;
  // 防抖延迟时间
  debounceDelay?: number;
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
