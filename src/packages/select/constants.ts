import type { InjectionKey } from "vue";
import type { ValueType, PropsType, SelectStateType } from "./select";

/**
 * @description 选择器组上下文类型
 * @interface GroupContextType
 * @extends {PropsType}
 */
export interface GroupContextType extends PropsType {
  /** 选中值 */
  model?: ValueType;
  /** 组状态对象 */
  groupState?: SelectStateType;
}

/**
 * @description 选择器组注入键
 * @type {InjectionKey<GroupContextType>}
 */
export const selectGroupKey: InjectionKey<GroupContextType> = Symbol("selectKey");
