import type { InjectionKey } from "vue";
import type { ValueType } from "./collapse";

/** 折叠面板组上下文类型定义 */
export interface GroupContextType {
  /** 选中值 */
  model?: ValueType[];
  /** 状态更新函数 */
  changeEvent: (isChecked: boolean, val?: ValueType) => void;
}

/** 折叠面板组注入key */
export const collapseGroupKey: InjectionKey<GroupContextType> = Symbol("collapseGroupKey");
