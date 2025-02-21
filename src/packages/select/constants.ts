import type { InjectionKey } from "vue";
import type { ValueType, PropsType } from "./select";

export interface GroupContextType extends PropsType {
  model?: ValueType;
  temModel?: ValueType;
}

export const selectGroupKey: InjectionKey<GroupContextType> = Symbol("selectKey");
