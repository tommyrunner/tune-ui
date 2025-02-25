import type { InjectionKey } from "vue";
import type { ValueType, PropsType } from "./select";

/**
 * @description 选择器组上下文类型
 */
export interface GroupContextType extends PropsType {
  /** 选中值 */
  model?: ValueType;
  /** 临时值 */
  temModel?: ValueType;
}

/** 选择器组注入键 */
export const selectGroupKey: InjectionKey<GroupContextType> = Symbol("selectKey");
