import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType as CollapsePropsType, SlotsType as CollapseSlotsType, EmitsType as CollapseEmitsType } from "./collapse";
import type {
  PropsType as CollapseGroupPropsType,
  SlotsType as CollapseGroupSlotsType,
  EmitsType as CollapseGroupEmitsType
} from "./collapse-group";
import Collapse from "./index.vue";
import CollapseGroup from "./collapse-group.vue";

/** 导出折叠面板组件 */
export const TCollapse = Collapse as unknown as SFCWithInstall<CollapsePropsType, {}, CollapseSlotsType, CollapseEmitsType>;
/** 导出折叠面板组组件 */
export const TCollapseGroup = CollapseGroup as unknown as SFCWithInstall<
  CollapseGroupPropsType,
  {},
  CollapseGroupSlotsType,
  CollapseGroupEmitsType
>;

/** 导出折叠面板组件类型 */
export type TCollapseType = InstanceType<typeof TCollapse>;
/** 导出折叠面板组组件类型 */
export type TCollapseGroupType = InstanceType<typeof TCollapseGroup>;
