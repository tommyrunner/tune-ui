import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType, ExposesType } from "./tree";
import Tree from "./index.vue";

/**
 * @description 导出Tree组件
 * @component TTree
 */
export const TTree = Tree as unknown as SFCWithInstall<PropsType, ExposesType, SlotsType, EmitsType>;

// 组件类型
export type TreeInstance = InstanceType<typeof TTree>;
