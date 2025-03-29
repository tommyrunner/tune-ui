import type { InjectionKey } from "vue";
import type { FormContextType } from "./form";

/**
 * @description 表单上下文注入键
 */
export const formKey: InjectionKey<FormContextType> = Symbol("formKey");
