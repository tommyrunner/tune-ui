import type { InjectionKey } from "vue";
import type { ValueType } from "./checkbox";
import { PropsType } from "./checkbox-group";

export interface GroupContextType extends PropsType {
  model?: ValueType[];
  changeEvent: (isChecked?: boolean, val?: ValueType) => void;
}

export const checkboxGroupKey: InjectionKey<GroupContextType> = Symbol("checkboxGroupKey");
