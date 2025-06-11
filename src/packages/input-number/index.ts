import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./input-number";
import InputNumber from "./index.vue";

/** 导出数值输入框组件 */
export const TInputNumber = InputNumber as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;

/** 导出数值输入框组件类型 */
export type TInputNumberType = InstanceType<typeof TInputNumber>;
