<template>
  <form class="t-form" :class="formClasses" @submit.prevent="handleSubmit">
    <slot></slot>
    <div v-if="showDefaultFooter" class="t-form__footer">
      <slot name="footer">
        <t-button type="primary" html-type="submit" :loading="state.submitting">{{ TEXT_SUBMIT }}</t-button>
        <t-button html-type="button" @click="handleReset" style="margin-left: 10px">{{ TEXT_RESET }}</t-button>
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
  FormContextType,
  EmitsType,
  ExposesType
} from "./form";
import { reactive, provide, computed, useSlots } from "vue";
import { TButton } from "@/packages/button";
import { formKey } from "./constants";
import { isFunction } from "@/utils/is";
import { useI18nText } from "./i18n";

/**
 * @description 表单组件
 */
defineOptions({
  name: "TForm"
});

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<FormPropsType>(), {
  labelPosition: "right",
  labelWidth: "auto",
  inline: false,
  disabled: false,
  hideRequiredAsterisk: false,
  showMessage: true,
  inlineMessage: false,
  scrollToError: false,
  showDefaultFooter: true
});

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/**
 * @description 国际化文本
 */
const { TEXT_SUBMIT, TEXT_RESET } = useI18nText(props);

/**
 * @description 表单状态管理
 */
const state = reactive<FormStateType>({
  fields: [],
  submitting: false
});

/**
 * @description 计算表单类名
 * @returns {object} 表单样式类对象
 */
const formClasses = computed(() => ({
  "t-form--inline": props.inline,
  [`t-form--label-${props.labelPosition}`]: true,
  "t-disabled": props.disabled
}));

/**
 * @description 检查是否有自定义footer插槽
 */
const slots = useSlots();
const showDefaultFooter = computed(() => props.showDefaultFooter && !slots.footer);

/**
 * @description 添加表单项
 * @param {FormItemInstance} field - 表单项实例
 */
const addField = (field: FormItemInstance) => {
  state.fields.push(field);
};

/**
 * @description 移除表单项
 * @param {FormItemInstance} field - 表单项实例
 */
const removeField = (field: FormItemInstance) => {
  if (field.prop) {
    state.fields = state.fields.filter(item => item.prop !== field.prop);
  }
};

/**
 * @description 执行字段验证的通用方法
 * @param {FormItemInstance[]} fields - 待验证的字段数组
 * @returns {Promise<[boolean, Record<string, any>]>} 验证结果
 */
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

/**
 * @description 校验表单
 * @param {FormValidateCallback} callback - 验证回调函数
 * @returns {FormValidateResult} 验证结果Promise
 */
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

  // 触发验证事件
  emit("validate", "form", valid, valid ? undefined : "表单验证失败");
  callback?.(valid, invalidFields);
  return valid;
};

/**
 * @description 校验特定表单字段
 * @param {string | string[]} fieldProps - 字段属性名
 * @param {FormValidateCallback} callback - 验证回调函数
 * @returns {FormValidateResult} 验证结果Promise
 */
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

/**
 * @description 重置表单
 */
const resetFields = () => {
  if (!props.model) return;

  state.fields.forEach(field => field.resetField());

  // 触发重置事件
  emit("reset");

  if (isFunction(props.onReset)) {
    props.onReset();
  }
};

/**
 * @description 清除校验
 * @param {string | string[]} fieldProps - 字段属性名
 */
const clearValidate = (fieldProps?: string | string[]) => {
  const fieldsToValidate = fieldProps
    ? state.fields.filter(field => {
        const props = Array.isArray(fieldProps) ? fieldProps : [fieldProps];
        return props.includes(field.prop);
      })
    : state.fields;

  fieldsToValidate.forEach(field => field.clearValidate());
};

/**
 * @description 处理提交
 */
const handleSubmit = async () => {
  if (state.submitting) return;

  state.submitting = true;
  try {
    const valid = await validate();
    // 触发提交事件
    emit("submit", valid);

    if (valid && isFunction(props.onSubmit)) {
      await props.onSubmit();
    }
  } finally {
    state.submitting = false;
  }
};

/**
 * @description 处理重置
 */
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

defineExpose<ExposesType>({
  validate,
  validateField,
  resetFields,
  clearValidate
});
</script>
