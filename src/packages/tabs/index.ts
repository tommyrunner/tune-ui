import Tabs from './index.vue'
import TabsGroup from './tabs-group.vue'
export const TTabs = Tabs
export type TTabsType = InstanceType<typeof TTabs>
// 组合
export const TTabsGroup = TabsGroup
export type TTabsGroupType = InstanceType<typeof TTabsGroup>
