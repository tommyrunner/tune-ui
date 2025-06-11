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

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  size: 16,
  icon: "success-to"
});

/**
 * @description 计算图标样式
 * @returns {StyleValue} 样式对象
 */
const iconStyle = computed((): StyleValue => {
  const { size, color } = props;
  return {
    fontSize: `${size}px`,
    color
  };
});

/**
 * @description 计算图标类名
 * @returns {Array<string>} 类名数组
 */
const iconClass = computed((): Array<string> => {
  const { customIcon, icon, type } = props;
  return ["t-icon", "iconfont", `icon-${customIcon || icon}`, type && `t-icon-color-${type}`];
});
</script>
