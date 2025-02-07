import Collapse from "./index.vue";
import CollapseGroup from "./collapse-group.vue";

/** 导出折叠面板组件 */
export const TCollapse = Collapse;
/** 导出折叠面板组组件 */
export const TCollapseGroup = CollapseGroup;

/** 导出折叠面板组件类型 */
export type TCollapseType = InstanceType<typeof Collapse>;
/** 导出折叠面板组组件类型 */
export type TCollapseGroupType = InstanceType<typeof CollapseGroup>;
