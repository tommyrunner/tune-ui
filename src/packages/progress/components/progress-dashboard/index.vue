<template>
  <div
    class="t-progress-dashboard"
    :style="{
      width: `${width}px`,
      height: `${width}px`
    }"
  >
    <svg class="t-progress-dashboard__svg" viewBox="0 0 100 100">
      <path class="t-progress-dashboard__track" :d="trackPath" :stroke-width="relativeStrokeWidth" />
      <path
        class="t-progress-dashboard__path"
        :d="trackPath"
        :stroke-width="relativeStrokeWidth"
        :stroke="computedColor"
        :style="{
          strokeDasharray: `${perimeter}px`,
          strokeDashoffset: `${pathOffset}px`
        }"
      />
    </svg>
    <div v-if="showText" class="t-progress-dashboard__text">
      <slot :percentage="percentage">
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue";
import { progressKey } from "../../constants";
import type { ColorFunction } from "../../progress";

/**
 * @description 仪表盘进度条组件
 */
defineOptions({
  name: "TProgressDashboard"
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
 * 计算SVG路径
 * @returns {string} SVG路径
 */
const trackPath = computed(() => {
  const r = radius.value;
  // 创建一个底部缺口的圆弧，缺口为15%
  const startAngle = 0.65 * Math.PI; // 起始角度 (117度)
  const endAngle = 2.35 * Math.PI; // 结束角度 (423度)
  // 计算起始点和结束点坐标
  const startX = 50 + r * Math.cos(startAngle);
  const startY = 50 + r * Math.sin(startAngle);
  const endX = 50 + r * Math.cos(endAngle);
  const endY = 50 + r * Math.sin(endAngle);
  // 绘制大弧（85%的圆弧）
  return `M ${startX},${startY} A ${r},${r} 0 1 1 ${endX},${endY}`;
});

/**
 * 计算周长
 * @returns {number} 圆弧周长
 */
const perimeter = computed(() => 1.7 * Math.PI * radius.value);

/**
 * 获取当前百分比
 * @returns {number} 当前百分比
 */
const currentPercentage = computed(() => (progressState.percentage !== undefined ? progressState.percentage : percentage));

/**
 * 计算路径偏移量
 * @returns {number} 偏移量
 */
const pathOffset = computed(() => perimeter.value * (1 - currentPercentage.value / 100));

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

<style lang="scss" scoped>
@import "./index.scss";
</style>
