import type { InjectionKey } from "vue";
import type { PropsType } from "./list-view";

/** 列表组上下文类型 */
export interface GroupContextType extends PropsType {}

/** 列表组注入键 */
export const listViewGroupKey: InjectionKey<GroupContextType> = Symbol("listViewGroupKey");
