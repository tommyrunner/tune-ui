import type { InjectionKey } from "vue";
import type { SliderContextType } from "./slider";

/**
 * @description 滑块注入键
 * @type {InjectionKey<SliderContextType>}
 */
export const sliderKey: InjectionKey<SliderContextType> = Symbol("sliderKey");
