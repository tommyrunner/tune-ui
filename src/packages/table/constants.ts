import type { InjectionKey } from "vue";
import { PropsType } from "./table";

export interface GroupContextType extends PropsType {}

export const tableGroupKey: InjectionKey<GroupContextType> = Symbol("tableGroupKey");
