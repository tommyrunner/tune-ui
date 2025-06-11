import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./drawer";
import Drawer from "./index.vue";

/** 导出抽屉组件 */
export const TDrawer = Drawer as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
/** 导出抽屉组件类型 */
export type TDrawerType = InstanceType<typeof TDrawer>;
