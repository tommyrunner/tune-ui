import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType as CheckboxPropsType, SlotsType as CheckboxSlotsType, EmitsType as CheckboxEmitsType } from "./checkbox";
import type {
  PropsType as CheckboxGroupPropsType,
  SlotsType as CheckboxGroupSlotsType,
  EmitsType as CheckboxGroupEmitsType
} from "./checkbox-group";
import Checkbox from "./index.vue";
import CheckboxGroup from "./checkbox-group.vue";

/** 导出复选框组件 */
export const TCheckbox = Checkbox as unknown as SFCWithInstall<CheckboxPropsType, {}, CheckboxSlotsType, CheckboxEmitsType>;
/** 导出复选框组组件 */
export const TCheckboxGroup = CheckboxGroup as unknown as SFCWithInstall<
  CheckboxGroupPropsType,
  {},
  CheckboxGroupSlotsType,
  CheckboxGroupEmitsType
>;

/** 导出复选框组件类型 */
export type TCheckboxType = InstanceType<typeof TCheckbox>;
/** 导出复选框组组件类型 */
export type TCheckboxGroupType = InstanceType<typeof TCheckboxGroup>;
