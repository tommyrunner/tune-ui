import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType as FlexPropsType, SlotsType as FlexSlotsType, EmitsType as FlexEmitsType } from "./flex";
import type {
  PropsType as FlexGroupPropsType,
  SlotsType as FlexGroupSlotsType,
  EmitsType as FlexGroupEmitsType
} from "./flex-group";
import Flex from "./index.vue";
import FlexGroup from "./flex-group.vue";

/** 导出Flex组件 */
export const TFlex = Flex as unknown as SFCWithInstall<FlexPropsType, {}, FlexSlotsType, FlexEmitsType>;
/** 导出Flex组组件 */
export const TFlexGroup = FlexGroup as unknown as SFCWithInstall<FlexGroupPropsType, {}, FlexGroupSlotsType, FlexGroupEmitsType>;

/** 导出Flex组件类型 */
export type TFlexType = InstanceType<typeof TFlex>;
/** 导出Flex组组件类型 */
export type TFlexGroupType = InstanceType<typeof TFlexGroup>;
