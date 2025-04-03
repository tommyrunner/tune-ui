<template>
  <form class="t-form" :class="formClasses" @submit.prevent="handleSubmit">
    <slot></slot>
    <div v-if="showDefaultFooter" class="t-form__footer">
      <slot name="footer">
        <t-button type="primary" html-type="submit" :loading="state.submitting">{{ submitText }}</t-button>
        <t-button html-type="button" @click="handleReset" style="margin-left: 10px">{{ resetText }}</t-button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts" setup>
import "./index.scss";
import type {
  FormPropsType,
  FormItemInstance,
  FormValidateResult,
  FormValidateCallback,
  FormStateType,
  FormContextType
} from "./form";
import { reactive, provide, computed, useSlots } from "vue";
import { formKey } from "./constants";
import { TButton } from "@/packages/button";
import { isFunction } from "@/utils/is";

defineOptions({
  name: "TForm"
});

const props = withDefaults(defineProps<FormPropsType>(), {
  labelPosition: "right",
  labelWidth: "auto",
  inline: false,
  disabled: false,
  hideRequiredAsterisk: false,
  showMessage: true,
  inlineMessage: false,
  scrollToError: false,
  submitText: "提交",
  resetText: "重置",
  showDefaultFooter: true
});

// 表单状态管理
const state = reactive<FormStateType>({
  fields: [],
  submitting: false
});

// 计算表单类名
const formClasses = computed(() => ({
  "t-form--inline": props.inline,
  [`t-form--label-${props.labelPosition}`]: true,
  "t-disabled": props.disabled
}));

// 检查是否有自定义footer插槽
const slots = useSlots();
const showDefaultFooter = computed(() => props.showDefaultFooter && !slots.footer);

// 添加表单项
const addField = (field: FormItemInstance) => {
  state.fields.push(field);
};

// 移除表单项
const removeField = (field: FormItemInstance) => {
  if (field.prop) {
    state.fields = state.fields.filter(item => item.prop !== field.prop);
  }
};

// 执行字段验证的通用方法
const validateFields = async (fields: FormItemInstance[]): Promise<[boolean, Record<string, any>]> => {
  let valid = true;
  const invalidFields: Record<string, any> = {};

  await Promise.all(
    fields.map(field => {
      return field.validate().then(
        () => true,
        error => {
          valid = false;
          invalidFields[field.prop] = error;
          return false;
        }
      );
    })
  );

  return [valid, invalidFields];
};

// 校验表单
const validate = async (callback?: FormValidateCallback): FormValidateResult => {
  if (!props.model) {
    return Promise.resolve(true);
  }

  const [valid, invalidFields] = await validateFields(state.fields);

  // 如果需要滚动到错误字段
  if (props.scrollToError && !valid) {
    const errorField = state.fields.find(field => field.validateState === "error");
    if (errorField) {
      const errorElement = document.querySelector(`[data-prop="${errorField.prop}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  callback?.(valid, invalidFields);
  return valid;
};

// 校验特定表单字段
const validateField = async (fieldProps: string | string[], callback?: FormValidateCallback): FormValidateResult => {
  const propsArray = Array.isArray(fieldProps) ? fieldProps : [fieldProps];
  const fieldsToValidate = state.fields.filter(field => propsArray.includes(field.prop));

  if (fieldsToValidate.length === 0) {
    return Promise.resolve(true);
  }

  const [valid, invalidFields] = await validateFields(fieldsToValidate);
  callback?.(valid, invalidFields);
  return valid;
};

// 重置表单
const resetFields = () => {
  if (!props.model) return;

  state.fields.forEach(field => field.resetField());

  if (isFunction(props.onReset)) {
    props.onReset();
  }
};

// 清除校验
const clearValidate = (fieldProps?: string | string[]) => {
  const fieldsToValidate = fieldProps
    ? state.fields.filter(field => {
        const props = Array.isArray(fieldProps) ? fieldProps : [fieldProps];
        return props.includes(field.prop);
      })
    : state.fields;

  fieldsToValidate.forEach(field => field.clearValidate());
};

// 处理提交
const handleSubmit = async () => {
  if (state.submitting) return;

  state.submitting = true;
  try {
    const valid = await validate();
    if (valid && isFunction(props.onSubmit)) {
      await props.onSubmit();
    }
  } finally {
    state.submitting = false;
  }
};

// 处理重置
const handleReset = () => {
  resetFields();
  state.submitting = false;
};

// 提供表单上下文
provide<FormContextType>(formKey, {
  ...props,
  validate,
  validateField,
  resetFields,
  clearValidate,
  addField,
  removeField
});

// 对外暴露方法
defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate
});
</script>
