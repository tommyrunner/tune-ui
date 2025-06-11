import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./date-picker";
import DatePicker from "./index.vue";

/**
 * @description DatePicker 日期选择器组件
 */
export const TDatePicker = DatePicker as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
/** 导出组件类型 */
export type TDatePickerType = InstanceType<typeof TDatePicker>;
