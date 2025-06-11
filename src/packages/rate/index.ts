import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./rate";
import Rate from "./index.vue";

/** 评分组件 */
export const TRate = Rate as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
export type TRateType = InstanceType<typeof TRate>;
