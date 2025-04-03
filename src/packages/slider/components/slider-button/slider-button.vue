<template>
  <div
    ref="buttonRef"
    class="t-slider-button"
    :class="{ 't-slider-button--dragging': dragging }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="onButtonDown"
    tabindex="0"
    @keydown.left.prevent="onLeftKeyDown"
    @keydown.right.prevent="onRightKeyDown"
    @keydown.down.prevent="vertical ? onRightKeyDown : undefined"
    @keydown.up.prevent="vertical ? onLeftKeyDown : undefined"
    role="slider"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="currentValue"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    :aria-disabled="disabled"
  >
    <!-- 自定义按钮内容插槽 -->
    <slot :value="currentValue" :index="index" :dragging="dragging" :disabled="disabled" :vertical="vertical">
      <!-- 默认按钮内容 -->
      <div class="t-slider-button__default">
        <div
          ref="tooltip"
          class="t-slider-button__tooltip"
          :class="[tooltipClass, `is-${placement}`]"
          v-show="showTooltip && (tooltipVisible || dragging)"
        >
          <span class="t-slider-button__tooltip-text">{{ formatValue }}</span>
        </div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import "./slider-button.scss";
import type { SliderContextType } from "../../slider";
import { computed, inject, ref, onMounted } from "vue";
import { sliderKey } from "../../constants";

/**
 * @description 滑块按钮组件
 */
defineOptions({
  name: "TSliderButton"
});

const model = defineModel<number>();

const props = defineProps<{
  vertical: boolean;
  tooltipClass?: string;
  index: number;
}>();

// 事件
const emit = defineEmits<{
  /**
   * 拖动开始时触发
   */
  (e: "dragstart"): void;
  /**
   * 拖动过程中触发
   */
  (e: "dragging", value: number): void;
  /**
   * 拖动结束时触发
   */
  (e: "dragend"): void;
}>();

// DOM引用
const buttonRef = ref<HTMLElement | null>(null);
const runwayRef = ref<HTMLElement | null>(null);

// 注入上下文
const sliderContext = inject<SliderContextType>(sliderKey)!;
const { min, max, step, disabled, showTooltip, formatTooltip, placement, sliderState, size } = sliderContext;

// 获取滑道元素
onMounted(() => {
  // 获取滑道元素
  if (buttonRef.value) {
    // 滑道是滑块按钮的祖父元素
    const parent = buttonRef.value.parentElement;
    if (parent) {
      runwayRef.value = parent.parentElement;
    }
  }

  // 根据size属性调整按钮位置
  if (buttonRef.value && size && size > 0) {
    if (props.vertical) {
      // 垂直模式下，调整按钮的水平位置
      buttonRef.value.style.left = `${size / 2}px`;
    } else {
      // 水平模式下，调整按钮的垂直位置
      buttonRef.value.style.top = `${size / 2}px`;
    }
  }
});

// 当前值
const currentValue = computed(() => model.value);

// 拖动状态
const dragging = computed(() => sliderState.dragging);

// Tooltip引用和状态
const tooltip = ref<HTMLElement | null>(null);
const tooltipVisible = computed(() => {
  if (Array.isArray(sliderState.tooltipVisible)) {
    return sliderState.tooltipVisible[props.index];
  }
  return false;
});

// 处理鼠标事件
const handleMouseEnter = () => {
  if (Array.isArray(sliderState.tooltipVisible)) {
    sliderState.tooltipVisible[props.index] = true;
  }
};

const handleMouseLeave = () => {
  if (Array.isArray(sliderState.tooltipVisible) && !dragging.value) {
    sliderState.tooltipVisible[props.index] = false;
  }
};

// 格式化显示值
const formatValue = computed(() => {
  if (formatTooltip && typeof formatTooltip === "function") {
    return formatTooltip(currentValue.value);
  }
  return currentValue.value;
});

// 计算新值
const getNewValue = (increase: boolean): number => {
  const stepValue = increase ? step : -step;
  const newVal = currentValue.value + stepValue;
  return Math.max(min, Math.min(max, newVal));
};

// 键盘导航
const onLeftKeyDown = () => {
  if (disabled) return;
  const newVal = getNewValue(false);
  model.value = newVal;
};

const onRightKeyDown = () => {
  if (disabled) return;
  const newVal = getNewValue(true);
  model.value = newVal;
};

// 鼠标事件
let startY = 0;
let startX = 0;
let startValue = 0;
let sliderLength = 0;

const onButtonDown = (event: MouseEvent) => {
  if (disabled) return;
  event.preventDefault();

  // 记录起始状态
  startY = event.clientY;
  startX = event.clientX;
  startValue = currentValue.value;

  // 获取滑道长度
  if (runwayRef.value) {
    if (props.vertical) {
      sliderLength = runwayRef.value.clientHeight;
    } else {
      sliderLength = runwayRef.value.clientWidth;
    }
  } else {
    // 如果没有获取到滑道元素，使用默认值
    sliderLength = props.vertical ? (sliderContext.height ? parseInt(sliderContext.height) : 200) : 400;
  }

  // 触发开始拖动事件
  emit("dragstart");

  // 添加全局事件
  document.addEventListener("mousemove", onDragging);
  document.addEventListener("mouseup", onDragEnd);
};

const onDragging = (event: MouseEvent) => {
  if (disabled) return;

  // 计算差值
  let diff = 0;
  if (props.vertical) {
    diff = startY - event.clientY;
  } else {
    diff = event.clientX - startX;
  }

  // 计算变化的值
  const range = max - min;
  // 计算比例 (使用捕获的滑道长度)
  const ratio = diff / sliderLength;
  const valueChange = range * ratio;

  // 计算新值
  let newValue = startValue + valueChange;
  // 按步长调整
  if (step > 0) {
    newValue = Math.round(newValue / step) * step;
  }
  // 确保在范围内
  newValue = Math.max(min, Math.min(max, newValue));

  // 更新模型值
  model.value = newValue;

  // 触发值更新事件
  emit("dragging", newValue);
};

const onDragEnd = () => {
  if (disabled) return;

  // 移除全局事件
  document.removeEventListener("mousemove", onDragging);
  document.removeEventListener("mouseup", onDragEnd);

  // 触发结束事件
  emit("dragend");

  // 隐藏tooltip
  if (Array.isArray(sliderState.tooltipVisible)) {
    setTimeout(() => {
      sliderState.tooltipVisible[props.index] = false;
    }, 300);
  }
};
</script>
