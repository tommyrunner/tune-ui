<template>
  <div class="t-progress--line">
    <div class="t-progress-bar" :style="{ height: `${strokeWidth}px` }">
      <!-- 进度条 -->
      <div
        class="t-progress-bar__inner"
        :class="{
          'is-striped-flow': stripedFlow,
          [`t-progress--${status}`]: status
        }"
        :style="{
          width: `${currentPercentage}%`,
          backgroundColor: computedColor
        }"
      >
        <!-- 直接将文本放在进度条内部 -->
        <div v-if="showText && textInside && currentPercentage > textDisplayThreshold" class="t-progress-bar__inner-text">
          <slot :percentage="percentage">
            {{ content }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./progress-line.scss";
import { computed, inject } from "vue";
import { progressKey } from "../../constants";
import type { ColorFunction } from "../../progress";

/**
 * @description 线性进度条组件
 */
defineOptions({
  name: "TProgressLine"
});

/**
 * 文本显示的最小百分比阈值
 * 当进度条百分比小于此值时，内部文本不显示
 */
const textDisplayThreshold = 10;

// 注入上下文
const progressContext = inject(progressKey)!;
const {
  percentage,
  showText,
  textInside,
  format,
  stripedFlow,
  strokeWidth = 6,
  status,
  color: customColor,
  progressState
} = progressContext;

/**
 * 获取当前百分比
 * @returns {number} 当前百分比值
 */
const currentPercentage = computed(() => (progressState.percentage !== undefined ? progressState.percentage : percentage));

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
 * 计算背景颜色
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
