import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./tag";
import Tag from "./index.vue";

/** 标签组件 */
export const TTag = Tag as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
export type TTagType = InstanceType<typeof TTag>;
