<template>
  <div :class="['t-flex-group']" :style="groupStyle">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";

import type { StyleValue } from "vue";
import type { PropsType } from "./flex-group";

import { computed } from "vue";

defineOptions({ name: "TFlexGroup" });

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  gap: 12,
  justify: "start"
});

/**
 * @description 计算FlexGroup样式
 * @returns {StyleValue} 样式对象
 */
const groupStyle = computed((): StyleValue => {
  const { gap, align, justify } = props;
  return {
    gap: `${gap}px`,
    alignItems: align,
    justifyContent: justify
  };
});
</script>
