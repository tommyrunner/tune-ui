import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType, IconTypes } from "./icon";
import Icon from "./index.vue";

/** 导出图标组件 */
export const TIcon = Icon as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
/** 导出图标组件类型 */
export type TIconType = InstanceType<typeof TIcon>;

/** 导出图标类型 */
export type { IconTypes };
