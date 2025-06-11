<template>
  <div :class="['t-flex']" :style="flexStyle">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";

import type { StyleValue } from "vue";
import type { PropsType } from "./flex";

import { computed, onDeactivated, ref } from "vue";

defineOptions({ name: "TFlex" });

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {});

/**
 * @description 当前屏幕宽度
 */
const innerWidth = ref(window.innerWidth);

/**
 * @description 更新屏幕宽度
 * @returns {void}
 */
const updateLayout = (): void => {
  innerWidth.value = window.innerWidth;
};

// 监听窗口大小变化
window.addEventListener("resize", updateLayout);

// 组件失活时移除监听
onDeactivated(() => {
  window.removeEventListener("resize", updateLayout);
});

/**
 * @description 计算Flex样式
 * @returns {StyleValue} 样式对象
 */
const flexStyle = computed((): StyleValue => {
  const { span, sort, offset, xs, sm, md, lg, xl } = props;

  // 计算响应式span值
  let spanVal = span > 10 ? 10 : span;
  const width = innerWidth.value;

  if (width >= 1920 && xl) {
    spanVal = xl;
  } else if (width >= 1200 && lg) {
    spanVal = lg;
  } else if (width >= 992 && md) {
    spanVal = md;
  } else if (width >= 768 && sm) {
    spanVal = sm;
  } else if (xs) {
    spanVal = xs;
  }

  return {
    display: span <= 0 ? "none" : "inline-block",
    width: spanVal && `${spanVal * 10}%`,
    marginLeft: offset && `${offset * 10}%`,
    order: sort?.toString()
  };
});
</script>
