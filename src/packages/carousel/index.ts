import Carousel from './index.vue'
import CarouselGroup from './carousel-group.vue'

// 导出组件
export const TCarousel = Carousel
export const TCarouselGroup = CarouselGroup
// 导出组件类型
export type TCarouselType = InstanceType<typeof TCarousel>
export type TCarouselGroupType = InstanceType<typeof TCarouselGroup>
