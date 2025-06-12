import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType, ExposesType } from "./scrollbar";
import Scrollbar from "./index.vue";
/** 导出Scrollbar组件 */
export const TScrollbar = Scrollbar as unknown as SFCWithInstall<PropsType, ExposesType, SlotsType, EmitsType>;
/** 导出Scrollbar组件类型 */
export type TScrollbarType = InstanceType<typeof TScrollbar>;
