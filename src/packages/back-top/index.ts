import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./back-top";
import BackTop from "./index.vue";
/** 导出组件 */
export const TBackTop = BackTop as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
/** 导出组件类型 */
export type TBackTopType = InstanceType<typeof TBackTop>;
