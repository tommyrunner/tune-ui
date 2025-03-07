<template>
  <div class="t-slider-marks">
    <div
      v-for="(value, key) in markList"
      :key="key"
      class="t-slider-marks__mark"
      :class="{ 'is-active': isActive(+key) }"
      :style="getMarkPosition(+key)"
      @click="handleMark(+key)"
    >
      <span
        v-if="isObjectWithLabel(value) || typeof value === 'string'"
        class="t-slider-marks__label"
        :style="getMarkStyle(value)"
      >
        {{ typeof value === "string" ? value : value.label }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue";
import { sliderKey } from "../../constants";
import type { MarkObject, MarksType, SliderContextType } from "../../slider";

/**
 * @description 滑块刻度标记组件
 */
defineOptions({
  name: "TSliderMarks"
});

const model = defineModel<number | number[]>();

// 注入上下文
const sliderContext = inject<SliderContextType>(sliderKey)!;
const { min, max, marks, vertical, range, disabled } = sliderContext;

// 刻度标记列表
const markList = computed<MarksType>(() => marks || {});

// 检查是否为带有标签的对象
const isObjectWithLabel = (value: unknown): value is MarkObject => {
  return typeof value === "object" && value !== null && "label" in value;
};

// 检查标记是否激活
const isActive = (value: number): boolean => {
  if (range && Array.isArray(model.value)) {
    return value <= Math.max(...model.value) && value >= Math.min(...model.value);
  }
  return value <= (model.value as number);
};

// 获取标记位置样式
const getMarkPosition = (value: number) => {
  // 计算百分比位置
  const percent = ((value - min) / (max - min)) * 100;

  // 根据垂直模式返回不同样式
  if (vertical) {
    return {
      bottom: `${percent}%`
      // 不需要设置left，由CSS处理
    };
  }
  return {
    left: `${percent}%`
    // 不需要设置top，由CSS处理
  };
};

// 获取标记样式
const getMarkStyle = (mark: string | MarkObject) => {
  if (isObjectWithLabel(mark) && mark.style) {
    return mark.style;
  }
  return {};
};

// 处理标记点击
const handleMark = (value: number) => {
  if (disabled) return;

  // 如果是范围选择
  if (range && Array.isArray(model.value)) {
    // 找到最接近的滑块
    const [min, max] = model.value;
    const middle = (min + max) / 2;

    if (value <= middle) {
      model.value = [value, max];
    } else {
      model.value = [min, value];
    }
  } else {
    // 单值模式
    model.value = value;
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
