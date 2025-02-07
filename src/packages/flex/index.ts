import Flex from "./index.vue";
import FlexGroup from "./flex-group.vue";

/** 导出Flex组件 */
export const TFlex = Flex;
/** 导出Flex组组件 */
export const TFlexGroup = FlexGroup;

/** 导出Flex组件类型 */
export type TFlexType = InstanceType<typeof Flex>;
/** 导出Flex组组件类型 */
export type TFlexGroupType = InstanceType<typeof FlexGroup>;
