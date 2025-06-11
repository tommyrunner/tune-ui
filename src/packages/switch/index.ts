import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./switch";
import Switch from "./index.vue";

/** 开关组件 */
export const TSwitch = Switch as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
export type TSwitchType = InstanceType<typeof TSwitch>;
