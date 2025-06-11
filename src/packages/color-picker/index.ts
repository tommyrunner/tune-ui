import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./color-picker";
import ColorPicker from "./index.vue";

/** 导出组件 */
export const TColorPicker = ColorPicker as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
/** 导出组件类型 */
export type TColorPickerType = InstanceType<typeof TColorPicker>;
