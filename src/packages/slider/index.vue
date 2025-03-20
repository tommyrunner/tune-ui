<template>
  <div
    class="t-slider"
    :class="[
      `t-slider--${vertical ? 'vertical' : 'horizontal'}`,
      { 't-slider--without-tooltip': !showTooltip, 't-disabled': disabled },
      status ? `is-${status}` : ''
    ]"
    :style="sliderStyle"
    @click.prevent="onSliderClick"
  >
    <div class="t-slider__runway" :style="runwayStyle">
      <div class="t-slider__bar" :style="barStyle"></div>

      <!-- 刻度点 -->
      <template v-if="showStops">
        <div v-for="(position, index) in stops" :key="index" class="t-slider__stop" :style="getStopStyle(position)"></div>
      </template>

      <!-- 刻度标记 -->
      <slider-marks v-if="marks" v-model="model" />

      <!-- 滑块按钮 -->
      <template v-if="range">
        <div v-for="(item, index) in sliderValues" :key="index" class="t-slider__button-wrapper" :style="getButtonStyle(item)">
          <slider-button
            v-model="sliderButtonValues[index]"
            :vertical="vertical"
            :tooltip-class="tooltipClass"
            :index="index"
            @dragstart="handleDragStart"
            @dragging="value => handleDragging(index, value)"
            @dragend="handleDragEnd"
          >
            <template #default="slotProps">
              <slot name="button" v-bind="slotProps"></slot>
            </template>
          </slider-button>
        </div>
      </template>
      <template v-else>
        <div class="t-slider__button-wrapper" :style="getButtonStyle(sliderValues[0])">
          <slider-button
            v-model="sliderButtonValues[0]"
            :vertical="vertical"
            :tooltip-class="tooltipClass"
            :index="0"
            @dragstart="handleDragStart"
            @dragging="value => handleDragging(0, value)"
            @dragend="handleDragEnd"
          >
            <template #default="slotProps">
              <slot name="button" v-bind="slotProps"></slot>
            </template>
          </slider-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, watch, ref } from "vue";
import { sliderKey } from "./constants";
import type { SliderStateType, SliderPropsType, EmitsType } from "./slider";
import SliderButton from "./components/slider-button/index.vue";
import SliderMarks from "./components/slider-marks/index.vue";

/**
 * @description 滑块组件
 */
defineOptions({
  name: "TSlider"
});

const model = defineModel<number | number[]>({
  // 添加默认值，确保model始终有值
  default: 0
});

// 子组件按钮值，用于同步按钮组件的值
const sliderButtonValues = ref<number[]>([]);

const props = withDefaults(defineProps<SliderPropsType>(), {
  min: 0,
  max: 100,
  disabled: false,
  step: 1,
  size: 6,
  showStops: false,
  showTooltip: true,
  range: false,
  vertical: false,
  placement: "top",
  debounce: 300
});

// 事件
const emit = defineEmits<EmitsType>();

// 内部状态
const sliderState = reactive<SliderStateType>({
  dragging: false,
  currentValue: model.value ?? (props.range ? [props.min, props.max] : props.min),
  tooltipVisible: props.range ? [false, false] : [false]
});

// 初始化处理
const initData = () => {
  // 确保范围选择时，值是数组
  if (props.range && !Array.isArray(model.value)) {
    sliderState.currentValue = [props.min, props.max];
    model.value = sliderState.currentValue;
  } else if (!props.range && Array.isArray(model.value)) {
    sliderState.currentValue = model.value[0] || props.min;
    model.value = sliderState.currentValue;
  } else if (model.value === undefined || model.value === null) {
    // 处理model值为undefined或null的情况
    sliderState.currentValue = props.range ? [props.min, props.max] : props.min;
    model.value = sliderState.currentValue;
  } else {
    sliderState.currentValue = model.value;
  }

  // 初始化按钮值
  updateSliderButtonValues();
};

// 移除多余的监听器，保留必要的监听
watch(
  model,
  val => {
    if (val !== sliderState.currentValue) {
      sliderState.currentValue = val ?? (props.range ? [props.min, props.max] : props.min);
      updateSliderButtonValues();
    }
  },
  { immediate: true }
);

// 调整值以符合步长
const adjustValueToStep = (value: number): number => {
  if (props.step <= 0) return value;

  const steps = Math.round((value - props.min) / props.step);
  const stepValue = steps * props.step + props.min;

  return parseFloat(stepValue.toFixed(5));
};

// 更新按钮值
const updateSliderButtonValues = () => {
  if (Array.isArray(sliderState.currentValue)) {
    sliderButtonValues.value = [...sliderState.currentValue];
  } else {
    sliderButtonValues.value = [sliderState.currentValue as number];
  }
};

// 计算滑块值
const sliderValues = computed(() => {
  if (Array.isArray(sliderState.currentValue)) {
    return [...sliderState.currentValue].sort((a, b) => a - b);
  }
  return [sliderState.currentValue as number];
});

// 计算步长点
const stops = computed(() => {
  if (!props.showStops || props.min >= props.max) return [];

  const stopCount = (props.max - props.min) / props.step;
  const stepWidth = 100 / stopCount;
  const result: number[] = [];

  // 避免首尾点
  for (let i = 1; i < stopCount; i++) {
    result.push(i * stepWidth);
  }

  return result;
});

// 计算滑块容器样式
const sliderStyle = computed(() => {
  if (props.vertical) {
    return {
      height: props.height || "200px"
    };
  }
  return {};
});

// 计算滑道样式
const runwayStyle = computed(() => {
  const style: Record<string, string> = {};

  // 根据size属性调整滑道尺寸
  if (props.size && props.size > 0) {
    if (props.vertical) {
      style.width = `${props.size}px`;
    } else {
      style.height = `${props.size}px`;
    }
  }

  return style;
});

// 计算滑块条样式
const barStyle = computed(() => {
  const style: Record<string, string> = {};

  // 根据size属性调整滑块条尺寸
  if (props.size && props.size > 0) {
    if (props.vertical) {
      style.width = `${props.size}px`;
    } else {
      style.height = `${props.size}px`;
    }
  }

  if (props.range && Array.isArray(sliderState.currentValue)) {
    const [min, max] = sliderValues.value;
    const startPercent = ((min - props.min) / (props.max - props.min)) * 100;
    const endPercent = ((max - props.min) / (props.max - props.min)) * 100;

    if (props.vertical) {
      style.bottom = `${startPercent}%`;
      style.height = `${endPercent - startPercent}%`;
    } else {
      style.left = `${startPercent}%`;
      style.width = `${endPercent - startPercent}%`;
    }
  } else {
    const percent = ((sliderValues.value[0] - props.min) / (props.max - props.min)) * 100;

    if (props.vertical) {
      style.height = `${percent}%`;
    } else {
      style.width = `${percent}%`;
    }
  }

  return style;
});

// 获取间断点样式
const getStopStyle = (position: number) => {
  if (props.vertical) {
    return {
      bottom: `${position}%`
    };
  }
  return {
    left: `${position}%`
  };
};

// 获取按钮位置样式
const getButtonStyle = (value: number) => {
  const percent = ((value - props.min) / (props.max - props.min)) * 100;

  if (props.vertical) {
    return {
      bottom: `${percent}%`
    };
  }

  return {
    left: `${percent}%`
  };
};

// 将值转换为步长的倍数
const valueToStep = (value: number): number => {
  return adjustValueToStep(value);
};

// 将百分比转换为值
const percentToValue = (percent: number): number => {
  const value = (percent * (props.max - props.min)) / 100 + props.min;
  return valueToStep(value);
};

// 处理拖动开始
const handleDragStart = () => {
  sliderState.dragging = true;
};

// 处理拖动过程
const handleDragging = (index: number, value: number) => {
  // 更新数值
  const newValue = valueToStep(value);

  if (props.range && Array.isArray(sliderState.currentValue)) {
    const updatedValue = [...sliderState.currentValue];
    updatedValue[index] = newValue;

    // 直接更新model值，确保实时同步
    model.value = [...updatedValue].sort((a, b) => a - b);
    sliderState.currentValue = model.value;

    // 更新按钮值
    updateSliderButtonValues();

    // 触发事件
    emit("input", model.value);
  } else {
    // 直接更新model值，确保实时同步
    model.value = newValue;
    sliderState.currentValue = newValue;

    // 更新按钮值
    sliderButtonValues.value[0] = newValue;

    // 触发事件
    emit("input", newValue);
  }
};

// 处理拖动结束
const handleDragEnd = () => {
  sliderState.dragging = false;

  // 触发事件
  emit("change", model.value);
};

// 处理点击滑块
const onSliderClick = (event: MouseEvent) => {
  if (props.disabled || sliderState.dragging) return;

  // 获取点击位置
  const sliderRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  let percent = 0;

  if (props.vertical) {
    const sliderHeight = sliderRect.height;
    // 计算从底部开始的百分比
    percent = ((sliderRect.bottom - event.clientY) / sliderHeight) * 100;
  } else {
    const sliderWidth = sliderRect.width;
    // 计算从左侧开始的百分比
    percent = ((event.clientX - sliderRect.left) / sliderWidth) * 100;
  }

  // 转换为值
  const value = percentToValue(percent);

  if (props.range) {
    // 范围模式下找到最近的滑块
    const [min, max] = sliderValues.value;
    const middle = (min + max) / 2;

    if (value <= middle) {
      model.value = [value, max];
    } else {
      model.value = [min, value];
    }

    // 更新内部状态
    sliderState.currentValue = model.value;
    updateSliderButtonValues();
  } else {
    // 单值模式
    model.value = value;
    sliderState.currentValue = value;
    updateSliderButtonValues();
  }

  // 触发事件
  emit("change", model.value);
};

// 初始化
initData();

// 提供上下文
provide(sliderKey, {
  ...props, // 直接提供整个props对象，确保响应式
  sliderState,
  // 确保formatTooltip函数正确传递
  formatTooltip: props.formatTooltip
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
