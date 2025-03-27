<template>
  <form class="t-form" :class="formClasses" @submit.prevent>
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import type { FormPropsType, FormItemInstance, FormValidateResult, FormValidateCallback, FormStateType } from "./form";
import { reactive, provide, computed } from "vue";
import { formKey } from "./constants";

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
  scrollToError: false
});

// 使用reactive统一管理状态
const state = reactive<FormStateType>({
  fields: []
});

/**
 * 计算表单类名
 */
const formClasses = computed(() => {
  return [
    {
      "t-form--inline": props.inline,
      "t-form--label-left": props.labelPosition === "left",
      "t-form--label-right": props.labelPosition === "right",
      "t-form--label-top": props.labelPosition === "top",
      "t-disabled": props.disabled
    }
  ];
});

/**
 * 添加表单项实例
 * @param {FormItemInstance} field - 表单项实例
 */
const addField = (field: FormItemInstance) => {
  state.fields.push(field);
};

/**
 * 移除表单项实例
 * @param {FormItemInstance} field - 表单项实例
 */
const removeField = (field: FormItemInstance) => {
  if (field.prop) {
    state.fields = state.fields.filter(item => item.prop !== field.prop);
  }
};

/**
 * 校验整个表单
 * @param {FormValidateCallback} callback - 校验回调函数
 * @returns {FormValidateResult} 校验结果Promise
 */
const validate = async (callback?: FormValidateCallback): FormValidateResult => {
  if (!props.model) {
    return Promise.resolve(true);
  }

  let valid = true;
  const invalidFields: Record<string, any> = {};

  // 所有表单项验证
  const validateResults = await Promise.all(
    state.fields.map(field => {
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

  // 如果需要滚动到错误字段
  if (props.scrollToError && !valid) {
    scrollToFirstError();
  }

  if (callback) {
    callback(valid, invalidFields);
  }

  return valid;
};

/**
 * 校验特定表单字段
 * @param {string | string[]} props - 字段名或字段名数组
 * @param {FormValidateCallback} callback - 校验回调函数
 * @returns {FormValidateResult} 校验结果Promise
 */
const validateField = async (fieldProps: string | string[], callback?: FormValidateCallback): FormValidateResult => {
  const propsArray = Array.isArray(fieldProps) ? fieldProps : [fieldProps];
  const fieldsToValidate = state.fields.filter(field => propsArray.includes(field.prop));

  if (fieldsToValidate.length === 0) {
    return Promise.resolve(true);
  }

  let valid = true;
  const invalidFields: Record<string, any> = {};

  const validateResults = await Promise.all(
    fieldsToValidate.map(field => {
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

  if (callback) {
    callback(valid, invalidFields);
  }

  return valid;
};

/**
 * 重置表单
 */
const resetFields = () => {
  if (!props.model) {
    return;
  }
  state.fields.forEach(field => {
    field.resetField();
  });
};

/**
 * 清除校验
 * @param {string | string[]} props - 字段名或字段名数组
 */
const clearValidate = (fieldProps?: string | string[]) => {
  const fieldsToValidate = fieldProps
    ? state.fields.filter(field => {
        const props = Array.isArray(fieldProps) ? fieldProps : [fieldProps];
        return props.includes(field.prop);
      })
    : state.fields;

  fieldsToValidate.forEach(field => {
    field.clearValidate();
  });
};

/**
 * 滚动到第一个错误字段
 */
const scrollToFirstError = () => {
  const errorField = state.fields.find(field => field.validateState === "error");
  if (errorField) {
    const errorElement = document.querySelector(`[data-prop="${errorField.prop}"]`);
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
};

// 向子组件提供表单上下文 - 直接结构props而非使用reactive包装
provide(formKey, {
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

<style lang="scss" scoped>
@import "./index.scss";
</style>
