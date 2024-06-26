import Collapse from './index.vue'
import CollapseItem from './collapse-item.vue'

// 导出组件
export const TCollapse = Collapse
export const TCollapseItem = CollapseItem
// 导出组件类型
export type TCollapseType = InstanceType<typeof TCollapse>
export type TCollapseItemType = InstanceType<typeof TCollapseItem>
