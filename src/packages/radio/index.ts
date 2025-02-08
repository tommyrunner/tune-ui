import Radio from "./index.vue";
import RadioGroup from "./radio-group.vue";

/** 导出Radio组件 */
export const TRadio = Radio;
/** 导出Radio组件类型 */
export type TRadioType = InstanceType<typeof Radio>;

/** 导出RadioGroup组件 */
export const TRadioGroup = RadioGroup;
/** 导出RadioGroup组件类型 */
export type TRadioGroupType = InstanceType<typeof RadioGroup>;
