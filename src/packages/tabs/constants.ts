import type { InjectionKey } from "vue";
import type { ValueType } from "./tabs";
import type { PropsType } from "./tabs-group";

/** TabsGroup上下文类型定义 */
export interface GroupContextType extends PropsType {
  /** 当前选中值 */
  model?: ValueType;

  /**
   * 修改选中状态
   * @param el 目标元素
   * @param value 选中值
   * @param isChange 是否选中
   * @param isEmit 是否触发事件
   */
  changeEvent: (el: HTMLElement, value?: ValueType, isChange?: boolean, isEmit?: boolean) => void;

  /**
   * 处理关闭事件
   * @param value 关闭项的值
   */
  handleClose: (value?: ValueType) => void;
}

/** TabsGroup注入的key */
export const tabsGroupKey: InjectionKey<GroupContextType> = Symbol("tabsGroupKey");
