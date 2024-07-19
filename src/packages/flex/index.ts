import Flex from './index.vue'
import FlexGroup from './flex-group.vue'
// 导出组件
export const TFlex = Flex
export const TFlexGroup = FlexGroup
// 导出组件类型
export type TFlexType = InstanceType<typeof TFlex>
export type TFlexGroupType = InstanceType<typeof TFlexGroup>
