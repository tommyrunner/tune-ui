import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType } from "./breadcrumb";
import Breadcrumb from "./index.vue";

/** 导出组件 */
export const TBreadcrumb = Breadcrumb as unknown as SFCWithInstall<PropsType, {}, SlotsType, EmitsType>;
/** 导出组件类型 */
export type TBreadcrumbType = InstanceType<typeof TBreadcrumb>;
