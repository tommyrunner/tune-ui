<template>
  <div :class="optionClasses" @click="handleChange">
    <slot>{{ props.label }}</slot>
  </div>
</template>

<script lang="ts" setup>
// Vue相关导入
import { computed, inject } from "vue";

// 类型导入
import type { EmitsType, PropsType } from "./option";
import type { GroupContextType } from "./constants";
import type { SingleValueType } from "./select";

// 项目内导入
import { selectGroupKey } from "./constants";
import { isEqual, isValue } from "@/utils/is";

/**
 * @description 选项组件
 */
defineOptions({ name: "TSelectOption" });

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {});

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/**
 * @description 注入选择器组上下文
 */
const groupContext = inject<GroupContextType | undefined>(selectGroupKey, void 0);

/**
 * @description 处理点击事件
 * @returns {void}
 */
const handleChange = (): void => {
  emit("change", props);
};

/**
 * @description 计算选项类名
 * @returns {string[]} 类名数组
 */
const optionClasses = computed((): string[] => {
  const { disabled, value } = props;
  const { model, temModel, multiple } = groupContext;
  const groupValue = isValue(model) ? model : temModel;
  let isActive = false;

  if (multiple) {
    isActive = (groupValue as SingleValueType[]).includes(value);
  } else {
    isActive = isEqual(groupValue, value);
  }

  return ["t-option", isActive && "_active", disabled && "t-disabled"];
});
</script>

<style lang="scss" scoped>
@import "option.scss";
</style>
