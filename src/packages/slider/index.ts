import Slider from "./index.vue";

/**
 * @description 导出Slider组件
 * @component TSlider
 */
export const TSlider = Slider;
export default TSlider;

// 导出类型定义
export * from "./slider";

// 组件类型
export type SliderInstance = InstanceType<typeof Slider>;
