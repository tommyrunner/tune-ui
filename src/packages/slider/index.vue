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
import "./index.scss";
import type { EmitsType, PropsType } from "./slider";
import type { SliderStateType } from "./constants";
import { computed, provide, reactive, watch, ref } from "vue";
import SliderButton from "./components/slider-button/slider-button.vue";
import SliderMarks from "./components/slider-marks/slider-marks.vue";
import { sliderKey } from "./constants";

/**
 * @description 滑块组件
 */
defineOptions({
  name: "TSlider"
});

/**
 * @description v-model定义
 */
const model = defineModel<number | number[]>({
  default: 0
});

/** 子组件按钮值，用于同步按钮组件的值 */
const sliderButtonValues = ref<number[]>([]);

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
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

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/** 组件内部状态 */
const sliderState = reactive<SliderStateType>({
  dragging: false,
  currentValue: model.value ?? (props.range ? [props.min, props.max] : props.min),
  tooltipVisible: props.range ? [false, false] : [false]
});

/**
 * 初始化数据处理
 */
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

  updateSliderButtonValues();
};

/**
 * 监听model值变化
 */
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

/**
 * 调整值以符合步长
 * @param {number} value - 原始值
 * @returns {number} 调整后的值
 */
const adjustValueToStep = (value: number): number => {
  if (props.step <= 0) return value;

  const steps = Math.round((value - props.min) / props.step);
  const stepValue = steps * props.step + props.min;

  return parseFloat(stepValue.toFixed(5));
};

/**
 * 更新按钮值
 */
const updateSliderButtonValues = () => {
  if (Array.isArray(sliderState.currentValue)) {
    sliderButtonValues.value = [...sliderState.currentValue];
  } else {
    sliderButtonValues.value = [sliderState.currentValue as number];
  }
};

/**
 * 计算滑块值
 * @returns {number[]} 滑块值数组
 */
const sliderValues = computed((): number[] => {
  if (Array.isArray(sliderState.currentValue)) {
    return [...sliderState.currentValue].sort((a, b) => a - b);
  }
  return [sliderState.currentValue as number];
});

/**
 * 计算步长点
 * @returns {number[]} 步长点位置数组
 */
const stops = computed((): number[] => {
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

/**
 * 计算滑块容器样式
 * @returns {Record<string, string>} 样式对象
 */
const sliderStyle = computed((): Record<string, string> => {
  if (props.vertical) {
    return {
      height: props.height || "200px"
    };
  }
  return {};
});

/**
 * 计算滑道样式
 * @returns {Record<string, string>} 滑道样式对象
 */
const runwayStyle = computed((): Record<string, string> => {
  const style: Record<string, string> = {};

  if (props.size && props.size > 0) {
    if (props.vertical) {
      style.width = `${props.size}px`;
    } else {
      style.height = `${props.size}px`;
    }
  }

  return style;
});

/**
 * 计算滑块条样式
 * @returns {Record<string, string>} 滑块条样式对象
 */
const barStyle = computed((): Record<string, string> => {
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

/**
 * 获取间断点样式
 * @param {number} position - 位置百分比
 * @returns {Record<string, string>} 间断点样式对象
 */
const getStopStyle = (position: number): Record<string, string> => {
  if (props.vertical) {
    return {
      bottom: `${position}%`
    };
  }
  return {
    left: `${position}%`
  };
};

/**
 * 获取按钮位置样式
 * @param {number} value - 按钮值
 * @returns {Record<string, string>} 按钮位置样式对象
 */
const getButtonStyle = (value: number): Record<string, string> => {
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

/**
 * 将值转换为步长的倍数
 * @param {number} value - 原始值
 * @returns {number} 步长值
 */
const valueToStep = (value: number): number => {
  return adjustValueToStep(value);
};

/**
 * 将百分比转换为值
 * @param {number} percent - 百分比
 * @returns {number} 转换后的值
 */
const percentToValue = (percent: number): number => {
  const value = (percent * (props.max - props.min)) / 100 + props.min;
  return valueToStep(value);
};

/**
 * 处理拖动开始
 */
const handleDragStart = () => {
  sliderState.dragging = true;
};

/**
 * 处理拖动过程
 * @param {number} index - 滑块索引
 * @param {number} value - 拖动值
 */
const handleDragging = (index: number, value: number) => {
  const newValue = valueToStep(value);

  if (props.range && Array.isArray(sliderState.currentValue)) {
    const updatedValue = [...sliderState.currentValue];
    updatedValue[index] = newValue;

    model.value = [...updatedValue].sort((a, b) => a - b);
    sliderState.currentValue = model.value;

    updateSliderButtonValues();
    emit("input", model.value);
  } else {
    model.value = newValue;
    sliderState.currentValue = newValue;

    sliderButtonValues.value[0] = newValue;
    emit("input", newValue);
  }
};

/**
 * 处理拖动结束
 */
const handleDragEnd = () => {
  sliderState.dragging = false;
  emit("change", model.value);
};

/**
 * 处理点击滑块
 * @param {MouseEvent} event - 鼠标点击事件
 */
const onSliderClick = (event: MouseEvent) => {
  if (props.disabled || sliderState.dragging) return;

  const sliderRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  let percent = 0;

  if (props.vertical) {
    const sliderHeight = sliderRect.height;
    percent = ((sliderRect.bottom - event.clientY) / sliderHeight) * 100;
  } else {
    const sliderWidth = sliderRect.width;
    percent = ((event.clientX - sliderRect.left) / sliderWidth) * 100;
  }

  const value = percentToValue(percent);

  if (props.range) {
    const [min, max] = sliderValues.value;
    const middle = (min + max) / 2;

    if (value <= middle) {
      model.value = [value, max];
    } else {
      model.value = [min, value];
    }

    sliderState.currentValue = model.value;
    updateSliderButtonValues();
  } else {
    model.value = value;
    sliderState.currentValue = value;
    updateSliderButtonValues();
  }

  emit("change", model.value);
};

/** 初始化组件 */
initData();

/** 向子组件提供上下文数据 */
provide(sliderKey, {
  ...props,
  sliderState,
  formatTooltip: props.formatTooltip
});
</script>
