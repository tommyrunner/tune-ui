<template>
  <div :class="optionClasses" @click="handleChange">
    <div class="_option-content">
      <slot>{{ props.label }}</slot>
      <span v-if="props.subLabel" class="_sub-label">{{ props.subLabel }}</span>
    </div>
    <!-- 有子选项时显示箭头图标 -->
    <t-icon v-if="hasChildren" class="_arrow-icon" icon="caret-right" :size="12" />
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
import { TIcon } from "@/packages/icon";

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
 * @description 判断是否有子选项
 * @returns {boolean} 是否有子选项
 */
const hasChildren = computed((): boolean => {
  return Array.isArray(props.children) && props.children.length > 0;
});

/**
 * @description 处理点击事件
 * @returns {void}
 */
const handleChange = (): void => {
  // 禁用状态下不触发点击事件
  if (props.disabled) return;
  emit("change", props);
};

/**
 * @description 计算选项类名
 * @returns {string[]} 类名数组
 */
const optionClasses = computed((): string[] => {
  const { disabled, value } = props;
  const { model, groupState } = groupContext;
  const groupValue = isValue(model) ? model : groupState?.temModel;
  let isActive = false;

  // 判断常规选中状态
  if (groupContext.multiple) {
    isActive = (groupValue as SingleValueType[]).includes(value);
  } else {
    isActive = isEqual(groupValue, value);
  }

  // 在级联路径中判断是否被选中
  const isInCascadePath = groupState?.cascadePath?.some(option => isEqual(option.value, value));

  // 如果是级联路径中的任何一项，都应该高亮
  return ["t-option", (isActive || isInCascadePath) && "_active", disabled && "t-disabled", hasChildren.value && "_has-children"];
});
</script>

<style lang="scss" scoped>
@import "option.scss";
</style>
