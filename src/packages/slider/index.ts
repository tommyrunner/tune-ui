import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./slider";
import Slider from "./index.vue";

/**
 * @description 导出Slider组件
 * @component TSlider
 */
export const TSlider = Slider as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;

// 组件类型
export type SliderInstance = InstanceType<typeof TSlider>;
