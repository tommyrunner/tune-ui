<template>
  <div
    class="t-progress"
    :class="[`t-progress--${type}`, status ? `is-${status}` : '', { 't-progress--without-text': !showText }]"
    role="progressbar"
    :aria-valuenow="percentage"
    :aria-valuemin="0"
    :aria-valuemax="100"
  >
    <progress-line v-if="type === 'line'" />
    <progress-circle v-else-if="type === 'circle'" />
    <progress-dashboard v-else-if="type === 'dashboard'" />
    <div v-if="showText && !textInside && type === 'line'" class="t-progress-text">
      <slot :percentage="percentage">
        {{ formatText }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { ColorObject, PropsType } from "./progress";
import { computed, provide, reactive, watch } from "vue";
import ProgressLine from "./components/progress-line/progress-line.vue";
import ProgressCircle from "./components/progress-circle/progress-circle.vue";
import ProgressDashboard from "./components/progress-dashboard/progress-dashboard.vue";
import { progressKey } from "./constants";

defineOptions({ name: "TProgress" });

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  percentage: 0,
  type: "line",
  strokeWidth: 6,
  textInside: false,
  width: 126,
  showText: true,
  duration: 3,
  stripedFlow: false
});

/** 状态颜色映射 */
const statusColors = {
  success: "#67c23a",
  exception: "#f56c6c",
  warning: "#e6a23c"
};

/** 组件响应式状态对象 */
const progressState = reactive({
  percentage: props.percentage,
  customColor: "",
  computedColor: ""
});

/**
 * 计算动态颜色
 * @returns {string} 计算后的颜色值
 */
const computeColor = (): string => {
  // 如果设置了status，优先使用status对应的颜色
  if (props.status && statusColors[props.status]) {
    return statusColors[props.status];
  }

  // 如果设置了自定义颜色
  if (props.color) {
    // 如果是函数，根据百分比计算颜色
    if (typeof props.color === "function") {
      try {
        return props.color(progressState.percentage);
      } catch (error) {
        console.error("颜色函数执行错误", error);
        return "";
      }
    }

    // 如果是字符串，直接使用
    if (typeof props.color === "string") {
      return props.color;
    }

    // 如果是数组（渐变色），根据百分比选择颜色
    if (Array.isArray(props.color)) {
      return getColorFromArray(props.color);
    }
  }

  return "";
};

/**
 * 从颜色数组中获取匹配百分比的颜色
 * @param {ColorObject[]} colors - 颜色配置数组
 * @returns {string} 匹配的颜色值
 */
const getColorFromArray = (colors: ColorObject[]): string => {
  if (colors.length < 2) {
    return "";
  }

  // 排序以确保按百分比递增
  const sortedColors = [...colors].sort((a, b) => a.percentage - b.percentage);

  // 找到最接近当前百分比的颜色
  for (let i = 0; i < sortedColors.length; i++) {
    if (progressState.percentage < sortedColors[i].percentage) {
      return sortedColors[i].color;
    }
  }

  // 如果百分比大于所有定义的颜色，返回最后一个颜色
  return sortedColors[sortedColors.length - 1].color;
};

/**
 * 监听百分比变化，更新内部状态
 */
watch(
  () => props.percentage,
  val => {
    // 处理百分比范围
    const percentage = Math.max(0, Math.min(val, 100));
    progressState.percentage = percentage;
    // 更新颜色
    progressState.computedColor = computeColor();
  },
  { immediate: true }
);

/** 初始计算颜色 */
progressState.computedColor = computeColor();

/**
 * 计算显示的文本内容
 * @returns {string} 格式化后的文本
 */
const formatText = computed((): string => {
  if (props.format && typeof props.format === "function") {
    return props.format(props.percentage);
  }
  return `${props.percentage}%`;
});

/** 向子组件提供上下文数据 */
provide(progressKey, {
  ...props,
  progressState
});
</script>
