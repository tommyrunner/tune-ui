import type { InjectionKey } from "vue";
import type { TreeContext } from "./tree";

/**
 * @description Tree组件上下文的注入键
 */
export const treeContextKey: InjectionKey<TreeContext> = Symbol("treeContextKey"); 