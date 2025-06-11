import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType } from "./progress";
import Progress from "./index.vue";

/**
 * @description 导出Progress组件
 * @component TProgress
 */
export const TProgress = Progress as unknown as SFCWithInstall<PropsType, {}, SlotsType, {}>;
export default TProgress;

// 组件类型
export type ProgressInstance = InstanceType<typeof TProgress>;
