import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./input";
import Input from "./index.vue";

/** 导出输入框组件 */
export const TInput = Input as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
/** 导出输入框组件类型 */
export type TInputType = InstanceType<typeof TInput>;
