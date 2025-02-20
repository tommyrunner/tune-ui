import { ValueType } from "./select";

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 值
  value: ValueType;
  // 标签
  label?: string;
  // 子标签
  subLabel?: string;
  // 是否禁用
  disabled?: boolean;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 选择option
  (e: "change", params: PropsType): void;
}
