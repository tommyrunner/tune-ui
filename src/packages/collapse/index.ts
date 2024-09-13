import Collapse from "./index.vue";
import CollapseGroup from "./collapse-group.vue";

// 导出组件
export const TCollapse = Collapse;
export const TCollapseGroup = CollapseGroup;
// 导出组件类型
export type TCollapseType = InstanceType<typeof TCollapse>;
export type TCollapseGroupType = InstanceType<typeof TCollapseGroup>;
