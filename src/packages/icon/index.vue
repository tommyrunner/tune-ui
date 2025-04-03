<template>
  <i :style="iconStyle" :class="iconClass">
    <slot />
  </i>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { StyleValue } from "vue";
import type { PropsType } from "./icon";
import { computed } from "vue";

defineOptions({ name: "TIcon" });

const props = withDefaults(defineProps<PropsType>(), {
  size: 16,
  icon: "success-to"
});

/**
 * 计算图标样式
 */
const iconStyle = computed((): StyleValue => {
  const { size, color } = props;
  return {
    fontSize: `${size}px`,
    color
  };
});

/**
 * 计算图标类名
 */
const iconClass = computed(() => {
  const { customIcon, icon, type } = props;
  return ["t-icon", "iconfont", `icon-${customIcon || icon}`, type && `t-icon-color-${type}`];
});
</script>
