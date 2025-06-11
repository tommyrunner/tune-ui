import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./textarea";
import Textarea from "./index.vue";

/** 文本域组件 */
export const TTextarea = Textarea as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
export type TTextareaType = InstanceType<typeof TTextarea>;
