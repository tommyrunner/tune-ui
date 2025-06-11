<template>
  <div class="t-badge">
    <div v-if="value !== hiddenValue && value" :class="badgeClasses" :style="badgeStyles" ref="badgeRef">
      {{ badgeText }}
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";

import type { StyleValue } from "vue";
import type { PropsType } from "./badge";

import { computed, ref } from "vue";

defineOptions({ name: "TBadge" });

const props = withDefaults(defineProps<PropsType>(), {
  offsetY: 0,
  offsetX: 0,
  max: 99,
  color: "#f56c6c",
  hiddenValue: 0
});

const badgeRef = ref<HTMLDivElement>();

/**
 * @description 计算徽章类名
 * @returns {string[]} 类名数组
 */
const badgeClasses = computed((): string[] => {
  const { isDot } = props;
  return [isDot ? "_badge-dot" : "_badge-num"];
});

/**
 * @description 计算徽章样式
 * @returns {StyleValue} 样式对象
 */
const badgeStyles = computed((): StyleValue => {
  const { offsetWidth = 0, offsetHeight = 0 } = badgeRef.value || {};
  const { offsetX = 0, offsetY = 0, color } = props;

  return {
    backgroundColor: color,
    top: `${offsetY - offsetHeight / 2 + 1}px`,
    right: `${offsetX - offsetWidth / 2 + 1}px`
  };
});

/**
 * @description 计算徽章文本
 * @returns {string | number} 徽章显示文本
 */
const badgeText = computed((): string | number => {
  const { max, isDot, value } = props;
  if (isDot) return "";
  if (value && value > max) return `${max}+`;
  return value || "";
});
</script>
