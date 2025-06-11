import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./pop-confirm";
import PopConfirm from "./index.vue";

/** 气泡确认框组件 */
export const TPopConfirm = PopConfirm as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
export type TPopConfirmType = InstanceType<typeof TPopConfirm>;
