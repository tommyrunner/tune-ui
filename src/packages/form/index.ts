import Form from "./index.vue";
import FormItem from "./components/form-item/form-item.vue";

/** 导出表单组件 */
export const TForm = Form;
/** 导出表单项组件 */
export const TFormItem = FormItem;

/** 导出表单组件类型 */
export type TFormType = InstanceType<typeof TForm>;
/** 导出表单项组件类型 */
export type TFormItemType = InstanceType<typeof TFormItem>;
