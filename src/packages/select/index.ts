/**
 * @module Select
 */
import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType, ExposesType } from "./select";
import type { PropsType as OptionPropsType, SlotsType as OptionSlotsType, EmitsType as OptionEmitsType } from "./option";
import Select from "./index.vue";
import Option from "./option.vue";

/**
 * @description select组件
 */
export const TSelect = Select as unknown as SFCWithInstall<PropsType, ExposesType, SlotsType, EmitsType>;

/**
 * @description option组件
 */
export const TSelectOption = Option as unknown as SFCWithInstall<OptionPropsType, {}, OptionSlotsType, OptionEmitsType>;

/**
 * @description select类型
 */
export type TSelectType = InstanceType<typeof TSelect>;
