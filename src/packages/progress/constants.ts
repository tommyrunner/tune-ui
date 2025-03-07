import type { InjectionKey } from "vue";
import type { ProgressContextType } from "./progress";

/**
 * @description 进度条注入键
 * @type {InjectionKey<ProgressContextType>}
 */
export const progressKey: InjectionKey<ProgressContextType> = Symbol("progressKey");
