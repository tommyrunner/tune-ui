import Checkbox from "./index.vue";
import CheckboxGroup from "./checkbox-group.vue";

/** 导出复选框组件 */
export const TCheckbox = Checkbox;
/** 导出复选框组组件 */
export const TCheckboxGroup = CheckboxGroup;

/** 导出复选框组件类型 */
export type TCheckboxType = InstanceType<typeof Checkbox>;
/** 导出复选框组组件类型 */
export type TCheckboxGroupType = InstanceType<typeof TCheckboxGroup>;
