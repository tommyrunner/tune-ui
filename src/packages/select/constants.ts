import type { InjectionKey } from "vue";
import type { ValueType, PropsType } from "./select";

export interface GroupContextType extends PropsType {
  model?: ValueType;
}

export const tabsGroupKey: InjectionKey<GroupContextType> = Symbol("selectKey");
