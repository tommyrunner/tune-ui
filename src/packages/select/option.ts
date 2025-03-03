import type { ValueType } from "./select";

/**
 * @description 选项组件属性类型
 * @interface PropsType
 */
export interface PropsType {
  /** 选项值 */
  value: ValueType;
  /** 选项标签 */
  label?: string;
  /** 选项子标签 */
  subLabel?: string;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * @description 选项组件事件类型
 * @interface EmitsType
 */
export interface EmitsType {
  /** 选项变更事件 */
  (e: "change", params: PropsType): void;
}
