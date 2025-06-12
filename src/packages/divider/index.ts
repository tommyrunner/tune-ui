/**
 * @module Divider
 */
import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, EmitsType, SlotsType } from "./divider";
import Divider from "./index.vue";

/**
 * @description divider组件
 */
export const TDivider = Divider as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;

/**
 * @description divider类型
 */
export type TDividerType = InstanceType<typeof TDivider>;
