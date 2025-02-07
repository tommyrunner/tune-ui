<template>
  <button :class="buttonClasses" :style="buttonStyles" @click="handleClick">
    <t-icon v-if="props.prefixIcon" :icon="props.prefixIcon" class="_prefixIcon" />
    <slot />
    <t-icon v-if="props.suffixIcon || props.loading" :icon="loadingIcon" :class="['_suffixIcon', props.loading && 't-loading']" />
  </button>
</template>

<script lang="ts" setup>
import type { StyleValue } from "vue";
import type { EmitsType, PropsType } from "./button";
import type { IconTypes } from "@/packages/icon/icon";

import { computed } from "vue";
import { configOptions } from "@/hooks/useOptions";
import { TIcon } from "@/packages/icon";

defineOptions({ name: "TButton" });

// Props 定义
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  type: "default",
  loading: false,
  radius: "default",
  disabled: false,
  scale: true
});

// Emits 定义
const emit = defineEmits<EmitsType>();

/**
 * 计算加载状态图标
 */
const loadingIcon = computed((): IconTypes => {
  return !props.loading && props.suffixIcon ? props.suffixIcon : "loading";
});

/**
 * 处理按钮点击事件
 */
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};

/**
 * 计算按钮样式
 */
const buttonStyles = computed((): StyleValue => {
  if (!props.color) return undefined;

  return {
    color: "#ffffff",
    backgroundColor: props.color,
    border: `1px solid ${props.color}`
  };
});

/**
 * 计算按钮类名
 */
const buttonClasses = computed(() => {
  const { color, type, size, radius, scale, disabled, loading } = props;

  return [
    "t-button",
    !color && `t-button-type-${type}`,
    `t-button-size-${size}`,
    `t-button-radius-${radius}`,
    scale && !disabled && "t-button-scale",
    (disabled || loading) && "t-disabled"
  ];
});

// 对外暴露方法
defineExpose({
  handleClick
});
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
