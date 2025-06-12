/**
 * @module Radio
 */
import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType, ExposesType } from "./radio";
import type { PropsType as GroupPropsType, SlotsType as GroupSlotsType, EmitsType as GroupEmitsType } from "./radio-group";
import Radio from "./index.vue";
import RadioGroup from "./radio-group.vue";

/**
 * @description radio组件
 */
export const TRadio = Radio as unknown as SFCWithInstall<PropsType, ExposesType, SlotsType, EmitsType>;

/**
 * @description radio-group组件
 */
export const TRadioGroup = RadioGroup as unknown as SFCWithInstall<GroupPropsType, {}, GroupSlotsType, GroupEmitsType>;

/**
 * @description radio类型
 */
export type TRadioType = InstanceType<typeof TRadio>;

/**
 * @description radio-group类型
 */
export type TRadioGroupType = InstanceType<typeof TRadioGroup>;
