import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./date-picker-multiple";
import DatePickerMultiple from "./index.vue";

/**
 * @description DatePickerMultiple 多选日期选择器组件
 */
export const TDatePickerMultiple = DatePickerMultiple as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
/** 导出组件类型 */
export type TDatePickerMultipleType = InstanceType<typeof TDatePickerMultiple>;
