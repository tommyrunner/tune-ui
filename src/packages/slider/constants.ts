import type { InjectionKey } from "vue";
import type { PropsType } from "./slider";
/**
 * @description 滑块内部状态类型
 */
export interface SliderStateType {
  /** 是否正在拖动 */
  dragging: boolean;
  /** 当前值 */
  currentValue: number | number[];
  /** Tooltip显示标志 */
  tooltipVisible: boolean[];
}

/**
 * @description 滑块上下文类型
 * @extends SliderProps
 */
export interface SliderContextType extends Omit<PropsType, "modelValue"> {
  /** 滑块状态对象 */
  sliderState: SliderStateType;
}

/**
 * @description 滑块注入键
 * @type {InjectionKey<SliderContextType>}
 */
export const sliderKey: InjectionKey<SliderContextType> = Symbol("sliderKey");
