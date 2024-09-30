import type { InjectionKey } from "vue";
import { PropsType } from "./listView";

export interface GroupContextType extends PropsType {}

export const listViewGroupKey: InjectionKey<GroupContextType> = Symbol("listViewGroupKey");
