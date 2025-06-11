import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./dialog";
import Dialog from "./index.vue";

/** 导出对话框组件 */
export const TDialog = Dialog as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
/** 导出对话框组件类型 */
export type TDialogType = InstanceType<typeof TDialog>;
