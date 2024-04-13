import Checkbox from './index.vue'
import CheckboxGroup from './checkbox-group.vue'
export const TCheckbox = Checkbox
export type TCheckboxType = InstanceType<typeof Checkbox>
// 组合
export const TCheckboxGroup = CheckboxGroup
export type TCheckboxGroupType = InstanceType<typeof TCheckboxGroup>
