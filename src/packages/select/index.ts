/**
 * @description Select 选择器组件
 * @module Select
 */
import Select from "./index.vue";

/**
 * @description 导出Select组件
 * @component TSelect
 */
export const TSelect = Select;

/**
 * @description 导出Select组件类型
 * @typedef {InstanceType<typeof TSelect>} TSelectType
 */
export type TSelectType = InstanceType<typeof TSelect>;
