/**
 * @module Select
 */
import Select from "./index.vue";
import Option from "./option.vue";

/**
 * @description select组件
 */
export const TSelect = Select;

/**
 * @description option组件
 */
export const TSelectOption = Option;

/**
 * @description select类型
 */
export type TSelectType = InstanceType<typeof TSelect>;

/**
 * @description 默认配置值
 */
export const DEFAULT_VALUES = {
  clearable: true,
  filterable: false,
  multiple: false,
  showAllLevels: true,
  checkStrictly: true
};
