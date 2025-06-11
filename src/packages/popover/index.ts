import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType, ExposesType } from "./popover";
import Popover from "./index.vue";

/** 弹出框组件 */
export const TPopover = Popover as unknown as SFCWithInstall<PropsType, ExposesType, SlotsType, EmitsType>;
export type TPopoverType = InstanceType<typeof TPopover>;
