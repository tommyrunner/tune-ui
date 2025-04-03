<template>
  <div
    class="t-progress-circle"
    :style="{
      width: `${width}px`,
      height: `${width}px`
    }"
  >
    <svg class="t-progress-circle__svg" viewBox="0 0 100 100">
      <circle class="t-progress-circle__track" cx="50" cy="50" :r="radius" :stroke-width="relativeStrokeWidth" />
      <circle
        class="t-progress-circle__path"
        cx="50"
        cy="50"
        :r="radius"
        :stroke-width="relativeStrokeWidth"
        :stroke="computedColor"
        :style="{
          strokeDasharray: `${perimeter}px`,
          strokeDashoffset: `${pathOffset}px`
        }"
      />
    </svg>
    <div v-if="showText" class="t-progress-circle__text">
      <slot :percentage="percentage">
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./progress-circle.scss";
import type { ColorFunction } from "../../progress";
import { computed, inject } from "vue";
import { progressKey } from "../../constants";

/**
 * @description 环形进度条组件
 */
defineOptions({
  name: "TProgressCircle"
});

// 注入上下文
const progressContext = inject(progressKey)!;
const { percentage, showText, format, width = 126, strokeWidth = 6, color: customColor, progressState } = progressContext;

/**
 * 计算相对描边宽度
 * @returns {number} 相对描边宽度
 */
const relativeStrokeWidth = computed(() => (strokeWidth / width) * 100);

/**
 * 计算半径
 * @returns {number} 半径值
 */
const radius = computed(() => 50 - relativeStrokeWidth.value / 2);

/**
 * 计算周长
 * @returns {number} 圆周长
 */
const perimeter = computed(() => 2 * Math.PI * radius.value);

/**
 * 获取当前百分比
 * @returns {number} 当前百分比
 */
const currentPercentage = computed(() => (progressState.percentage !== undefined ? progressState.percentage : percentage));

/**
 * 计算路径偏移量
 * @returns {number} 偏移量
 */
const pathOffset = computed(() => Math.max(0, perimeter.value * (1 - currentPercentage.value / 100)));

/**
 * 计算显示的文本内容
 * @returns {string} 文本内容
 */
const content = computed(() => {
  if (format && typeof format === "function") {
    return format(currentPercentage.value);
  }
  return `${currentPercentage.value}%`;
});

/**
 * 计算颜色
 * @returns {string} 颜色值
 */
const computedColor = computed<string>(() => {
  if (!customColor) return "";
  if (typeof customColor === "function") {
    return (customColor as ColorFunction)(currentPercentage.value);
  }
  return customColor as string;
});
</script>
