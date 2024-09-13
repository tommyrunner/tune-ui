import Radio from "./index.vue";
import RadioGroup from "./radio-group.vue";
export const TRadio = Radio;
export type TRadioType = InstanceType<typeof TRadio>;
// 组合
export const TRadioGroup = RadioGroup;
export type TRadioGroupType = InstanceType<typeof TRadioGroup>;
