import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./button";
import Button from "./index.vue";

export const TButton = Button as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;

export type TButtonType = InstanceType<typeof TButton>;
