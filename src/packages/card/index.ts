import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType } from "./card";
import Card from "./index.vue";

/** 导出组件 */
export const TCard = Card as unknown as SFCWithInstall<PropsType, {}, SlotsType, {}>;
/** 导出组件类型 */
export type TCardType = InstanceType<typeof TCard>;
