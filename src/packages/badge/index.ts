import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType } from "./badge";
import Badge from "./index.vue";
/** 导出组件 */
export const TBadge = Badge as unknown as SFCWithInstall<PropsType, {}, SlotsType, {}>;
/** 导出组件类型 */
export type TBadgeType = InstanceType<typeof TBadge>;
