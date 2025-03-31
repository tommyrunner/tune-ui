<template>
  <div :class="dividerClasses">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { PropsType } from "./divider";
import { computed, useSlots } from "vue";

/**
 * @description 分割线组件
 */
defineOptions({ name: "TDivider" });

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  direction: "horizontal",
  borderStyle: "solid",
  contentPosition: "center"
});

/**
 * @description 获取插槽
 */
const slots = useSlots();

/**
 * @description 计算分割线类名
 * @returns {string[]} 类名数组
 */
const dividerClasses = computed((): string[] => {
  const { direction, borderStyle, contentPosition } = props;
  const hasSlot = !!slots.default;

  return [
    "t-divider",
    `t-divider--${direction}`,
    borderStyle !== "solid" && `t-divider--${borderStyle}`,
    hasSlot && direction === "horizontal" && "t-divider--with-text",
    hasSlot && direction === "horizontal" && contentPosition !== "center" && `t-divider--text-${contentPosition}`
  ].filter(Boolean);
});
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
