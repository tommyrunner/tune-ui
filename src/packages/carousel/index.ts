import Carousel from "./index.vue";
import CarouselGroup from "./carousel-group.vue";

/** 导出轮播项组件 */
export const TCarousel = Carousel;
/** 导出轮播组组件 */
export const TCarouselGroup = CarouselGroup;

/** 导出轮播项组件类型 */
export type TCarouselType = InstanceType<typeof TCarousel>;
/** 导出轮播组组件类型 */
export type TCarouselGroupType = InstanceType<typeof TCarouselGroup>;
