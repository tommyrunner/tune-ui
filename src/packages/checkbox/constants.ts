import type { InjectionKey } from "vue";
import type { ValueType } from "./checkbox";
import type { PropsType } from "./checkbox-group";

/** 复选框组上下文类型定义 */
export interface GroupContextType extends PropsType {
  /** 选中值 */
  model?: ValueType[];
  /** 状态更新函数 */
  changeEvent: (isChecked?: boolean, val?: ValueType) => void;
}

/** 复选框组注入key */
export const checkboxGroupKey: InjectionKey<GroupContextType> = Symbol("checkboxGroupKey");
