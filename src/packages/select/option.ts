import { ValueType } from "./select";

/**
 * @description: 组件props类型
 */
export interface PropsType {
  // 值
  value: ValueType;
  // 标签
  label?: string | number;
  // 子标签
  subLabel?: string | number;
}
/**
 * @description: 组件emit类型
 */
export interface EmitsType {
  // 选择option
  (e: "change", params: PropsType): void;
}
