import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType as CarouselPropsType, SlotsType as CarouselSlotsType } from "./carousel";
import type {
  PropsType as CarouselGroupPropsType,
  SlotsType as CarouselGroupSlotsType,
  EmitsType as CarouselGroupEmitsType
} from "./carousel-group";
import Carousel from "./index.vue";
import CarouselGroup from "./carousel-group.vue";

/** 导出轮播项组件 */
export const TCarousel = Carousel as unknown as SFCWithInstall<CarouselPropsType, {}, CarouselSlotsType, {}>;
/** 导出轮播组组件 */
export const TCarouselGroup = CarouselGroup as unknown as SFCWithInstall<
  CarouselGroupPropsType,
  {},
  CarouselGroupSlotsType,
  CarouselGroupEmitsType
>;

/** 导出轮播项组件类型 */
export type TCarouselType = InstanceType<typeof TCarousel>;
/** 导出轮播组组件类型 */
export type TCarouselGroupType = InstanceType<typeof TCarouselGroup>;
