import type { InjectionKey } from "vue";
import type { ValueType } from "./radio";
import type { PropsType } from "./radio-group";

/** RadioGroup上下文类型定义 */
export interface GroupContextType extends PropsType {
  /** 当前选中值 */
  model?: ValueType;
  /** 值改变事件 */
  changeEvent: (val?: ValueType) => void;
}

/** RadioGroup注入的key */
export const radioGroupKey: InjectionKey<GroupContextType> = Symbol("radioGroupKey");
