/**
 * @module Form
 */
import type { SFCWithInstall } from "@/utils/pack";
import type { FormPropsType as PropsType, SlotsType, EmitsType, ExposesType } from "./form";
import type {
  FormItemPropsType as ItemPropsType,
  FormItemSlotsType as ItemSlotsType,
  FormItemEmitsType as ItemEmitsType,
  FormItemExposesType as ItemExposesType
} from "./components/form-item/form-item";
import Form from "./index.vue";
import FormItem from "./components/form-item/form-item.vue";

/**
 * @description form组件
 */
export const TForm = Form as unknown as SFCWithInstall<PropsType, ExposesType, SlotsType, EmitsType>;

/**
 * @description form-item组件
 */
export const TFormItem = FormItem as unknown as SFCWithInstall<ItemPropsType, ItemExposesType, ItemSlotsType, ItemEmitsType>;

/**
 * @description form类型
 */
export type TFormType = InstanceType<typeof TForm>;

/**
 * @description form-item类型
 */
export type TFormItemType = InstanceType<typeof TFormItem>;
