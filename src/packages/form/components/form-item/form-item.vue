<template>
  <div class="t-form-item" :class="formItemClasses" :data-prop="prop">
    <div v-if="hasLabel" class="t-form-item__label" :style="{ width: finalLabelWidth }">
      <label :for="labelId" v-if="label || $slots.label">
        <slot name="label">{{ label }}</slot>
      </label>
      <!-- top格式时tip显示 -->
      <div v-if="props.tip && formContext?.labelPosition === 'top'" class="t-form-item__tip">
        <t-popover trigger="hover" :content="props.tip">
          <t-icon color="#999" icon="help" :size="16" />
        </t-popover>
      </div>
    </div>
    <div class="t-form-item__content">
      <slot></slot>
      <transition name="t-form-item-fade">
        <div v-if="shouldShowError" class="t-form-item__error" :class="{ 't-form-item__error--inline': showInlineError }">
          <slot name="error">{{ state.validateMessage }}</slot>
        </div>
      </transition>
    </div>
    <!-- 非top格式时tip显示 -->
    <div v-if="props.tip && formContext?.labelPosition !== 'top'" class="t-form-item__tip">
      <t-popover trigger="hover" :content="props.tip">
        <t-icon color="#999" icon="help" :size="16" />
      </t-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./form-item.scss";
import type { FormContextType, FormItemRule, FormValidateResult, FormItemTrigger } from "../../form";
import type { FormItemPropsType, FormItemValidateState, FormItemState } from "./form-item";
import { computed, inject, onBeforeUnmount, onMounted, reactive, useSlots, watch } from "vue";
import { formKey } from "../../constants";
import { generateId } from "@/utils";
import { isNullOrUnDef, isString, isFunction, isArray, isValue } from "@/utils/is";
import { TPopover } from "@/packages/popover";
import { TIcon } from "@/packages/icon";
import { useI18nText } from "../../i18n";

defineOptions({
  name: "TFormItem"
});

// Props定义
const props = withDefaults(defineProps<FormItemPropsType>(), {
  labelWidth: void 0,
  required: void 0,
  showMessage: void 0,
  inlineMessage: void 0,
  validateStatus: void 0,
  tip: void 0
});

const { TEXT_REQUIRED, TEXT_MIN, TEXT_MAX, TEXT_PATTERN, TEXT_VALIDATOR } = useI18nText();
// 定义事件
const emit = defineEmits<{
  (e: "validate", prop: string, isValid: boolean, message?: string): void;
}>();

// 获取slots
const $slots = useSlots();

// 注入表单上下文
const formContext = inject<FormContextType>(formKey, undefined);

// 使用reactive管理表单项状态
const state = reactive<FormItemState>({
  validateState: props.validateStatus as FormItemValidateState,
  validateMessage: "",
  isValidating: false,
  initialValue: undefined
});

// 生成唯一ID
const labelId = generateId();

/**
 * 计算表单项类名
 */
const formItemClasses = computed(() => ({
  "t-form-item--required": isRequired.value,
  "t-form-item--error": state.validateState === "error",
  "t-form-item--validating": state.validateState === "validating",
  "t-form-item--success": state.validateState === "success",
  "t-form-item--top": formContext?.labelPosition === "top"
}));

// 是否有标签
const hasLabel = computed(() => {
  return !!(props.label || $slots.label);
});

// 最终的标签宽度
const finalLabelWidth = computed(() => {
  const width = props.labelWidth || formContext?.labelWidth;
  if (!width) return "auto";
  return isString(width) && width.includes("px") ? width : `${width}px`;
});

// 是否是必填字段
const isRequired = computed(() => {
  if (props.required !== undefined) {
    return props.required;
  }

  if (!props.rules && !formContext?.rules) return false;

  const rules = getFieldRules();
  return rules.some(rule => rule.required);
});

// 是否显示内联错误信息
const showInlineError = computed(() => {
  if (props.inlineMessage !== undefined) {
    return props.inlineMessage;
  }
  return formContext?.inlineMessage || false;
});

// 是否应该显示错误信息
const shouldShowError = computed(() => {
  if (props.showMessage === false) return false;
  if (formContext?.showMessage === false) return false;
  return state.validateState === "error" && state.validateMessage;
});

/**
 * 获取表单项的字段值
 */
const fieldValue = computed(() => {
  if (!formContext?.model || !props.prop) return undefined;

  // 支持嵌套路径，如 'user.name'
  const paths = props.prop.split(".");
  let value: any = formContext.model;

  for (const path of paths) {
    if (isNullOrUnDef(value)) return undefined;
    value = value[path];
  }

  return value;
});

/**
 * 将规则转为数组
 */
const normalizeRules = (rules: FormItemRule | FormItemRule[] | undefined): FormItemRule[] => {
  if (!rules) return [];
  return isArray(rules) ? rules : [rules];
};

/**
 * 获取字段校验规则
 */
const getFieldRules = () => {
  const formRules = formContext?.rules;
  const selfRules = props.rules;
  const rules: FormItemRule[] = [];

  // 添加表单级别规则
  if (formRules && props.prop) {
    rules.push(...normalizeRules(formRules[props.prop]));
  }

  // 添加字段级别规则
  if (selfRules) {
    rules.push(...normalizeRules(selfRules));
  }

  return rules;
};

/**
 * 校验表单项
 * @param {FormItemTrigger} trigger - 触发校验的方式
 */
const validate = async (trigger?: FormItemTrigger): FormValidateResult => {
  if (!props.prop) return Promise.resolve(true);

  const rules = getFieldRules();
  if (rules.length === 0) return Promise.resolve(true);

  const value: any = fieldValue.value;

  // 设置校验状态为校验中
  state.validateState = "validating";
  state.isValidating = true;
  state.validateMessage = "";

  // 过滤触发器匹配的规则
  const filteredRules = trigger
    ? rules.filter(rule => {
        if (!rule.trigger) return true;
        if (isArray(rule.trigger)) {
          return rule.trigger.includes(trigger);
        }
        return rule.trigger === trigger;
      })
    : rules;

  if (filteredRules.length === 0) {
    state.validateState = "";
    state.isValidating = false;
    return Promise.resolve(true);
  }

  try {
    // 执行所有校验规则
    for (const rule of filteredRules) {
      // 必填校验
      if (rule.required && !isValue(value)) {
        throw new Error(rule.message || `${props.label || props.prop}${TEXT_REQUIRED}`);
      }

      // 如果值为空且不是必填，跳过其他校验
      if (!isValue(value)) {
        continue;
      }

      // 最小长度校验
      if (rule.min !== undefined && String(value).length < rule.min) {
        throw new Error(rule.message || `${props.label || props.prop}${TEXT_MIN}${rule.min}`);
      }

      // 最大长度校验
      if (rule.max !== undefined && String(value).length > rule.max) {
        throw new Error(rule.message || `${props.label || props.prop}${TEXT_MAX}${rule.max}`);
      }

      // 正则校验
      if (rule.pattern && !rule.pattern.test(String(value))) {
        throw new Error(rule.message || `${props.label || props.prop}${TEXT_PATTERN}`);
      }

      // 自定义校验函数
      if (rule.validator && isFunction(rule.validator)) {
        const result = await rule.validator(value);
        if (isString(result)) {
          throw new Error(result);
        } else if (result === false) {
          throw new Error(rule.message || `${props.label || props.prop}${TEXT_VALIDATOR}`);
        }
      }
    }

    // 全部校验通过
    state.validateState = "success";
    state.isValidating = false;
    emit("validate", props.prop, true);
    return true;
  } catch (error: any) {
    state.validateState = "error";
    state.validateMessage = error.message || TEXT_VALIDATOR;
    state.isValidating = false;
    emit("validate", props.prop, false, error.message);
    return Promise.reject(error.message);
  }
};

/**
 * 重置表单项
 */
const resetField = () => {
  if (!props.prop || !formContext?.model) return;

  // 支持嵌套路径，如 'user.name'
  const paths = props.prop.split(".");
  let model = formContext.model;

  // 设置值为初始值
  if (paths.length > 1) {
    const lastPath = paths.pop()!;
    for (const path of paths) {
      if (isNullOrUnDef(model[path])) {
        model[path] = {};
      }
      model = model[path];
    }
    model[lastPath] = state.initialValue;
  } else {
    model[props.prop] = state.initialValue;
  }

  // 清除验证状态
  clearValidate();
};

/**
 * 清除校验
 */
const clearValidate = () => {
  state.validateState = "";
  state.validateMessage = "";
  state.isValidating = false;
};

// 向表单注册和注销表单项
onMounted(() => {
  if (props.prop) {
    // 记录初始值
    if (fieldValue.value !== undefined) {
      state.initialValue = fieldValue.value;
    }

    formContext?.addField({
      prop: props.prop,
      validateState: state.validateState,
      validate,
      resetField,
      clearValidate
    });
  }

  // 监听字段值变化，如有需要进行校验
  watch(
    () => fieldValue.value,
    () => {
      if (props.validateStatus) return;

      if (state.isValidating) {
        validate("change");
      } else {
        state.validateState = "";
        state.validateMessage = "";
      }
    }
  );
});

onBeforeUnmount(() => {
  if (props.prop) {
    formContext?.removeField({
      prop: props.prop,
      validateState: state.validateState,
      validate,
      resetField,
      clearValidate
    });
  }
});

// 对外暴露方法
defineExpose({
  validate,
  resetField,
  clearValidate,
  prop: props.prop,
  validateState: state.validateState
});
</script>
