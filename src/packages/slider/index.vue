<template>
  <div
    class="t-slider"
    :class="{
      'is-vertical': props.vertical,
      't-disabled': props.disabled
    }"
    :style="sliderStyle"
  >
    <!-- 滑块主轨道 -->
    <div ref="sliderRunway" class="t-slider__runway" :style="runwayStyle" @click="onSliderClick">
      <!-- 已选择部分的轨道 -->
      <div class="t-slider__bar" :style="barStyle"></div>

      <!-- 步长断点 -->
      <template v-if="props.showStops && !props.range">
        <div v-for="(stop, index) in stops" :key="index" class="t-slider__stop" :style="getStopStyle(stop)"></div>
      </template>

      <!-- 单滑块 -->
      <div
        v-if="!props.range"
        ref="buttonWrapper"
        class="t-slider__button-wrapper"
        :style="wrapperStyle"
        @mousedown="onButtonDown"
        @touchstart="onButtonDown"
      >
        <!-- 使用插槽检测而非customButton属性 -->
        <slot name="button" :dragging="dragging">
          <!-- 默认按钮 -->
          <div class="t-slider__button" :class="{ dragging: dragging }"></div>
        </slot>

        <!-- 提示框 -->
        <div v-if="props.showTooltip && !props.disabled" class="t-slider__tooltip" v-show="showTooltip">
          {{ formatValue(model) }}
        </div>
      </div>

      <!-- 范围滑块 -->
      <template v-if="props.range">
        <!-- 最小值滑块 -->
        <div
          ref="minButtonWrapper"
          class="t-slider__button-wrapper"
          :style="minWrapperStyle"
          @mousedown="onMinButtonDown"
          @touchstart="onMinButtonDown"
        >
          <!-- 使用插槽检测而非customButton属性 -->
          <slot name="minButton" :dragging="minDragging">
            <!-- 默认最小值按钮 -->
            <div class="t-slider__button" :class="{ dragging: minDragging }"></div>
          </slot>

          <!-- 提示框 -->
          <div v-if="props.showTooltip && !props.disabled" class="t-slider__tooltip" v-show="showMinTooltip">
            {{ formatValue(Array.isArray(model) ? model[0] : props.min) }}
          </div>
        </div>

        <!-- 最大值滑块 -->
        <div
          ref="maxButtonWrapper"
          class="t-slider__button-wrapper"
          :style="maxWrapperStyle"
          @mousedown="onMaxButtonDown"
          @touchstart="onMaxButtonDown"
        >
          <!-- 使用插槽检测而非customButton属性 -->
          <slot name="maxButton" :dragging="maxDragging">
            <!-- 默认最大值按钮 -->
            <div class="t-slider__button" :class="{ dragging: maxDragging }"></div>
          </slot>

          <!-- 提示框 -->
          <div v-if="props.showTooltip && !props.disabled" class="t-slider__tooltip" v-show="showMaxTooltip">
            {{ formatValue(Array.isArray(model) ? model[1] : props.max) }}
          </div>
        </div>

        <!-- 范围模式下的步长断点 -->
        <template v-if="props.showStops">
          <div v-for="(stop, index) in stops" :key="index" class="t-slider__stop" :style="getStopStyle(stop)"></div>
        </template>
      </template>

      <!-- 标记点 -->
      <div v-if="marks.length > 0" class="t-slider__marks">
        <div v-for="(mark, index) in marks" :key="index" class="t-slider__mark" :style="getMarkStyle(mark.position)">
          <span class="t-slider__mark-text">{{ mark.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { EmitsType, PropsType } from "./slider";
import { computed, onUnmounted, ref } from "vue";
import { bindThrottle } from "@/utils";

defineOptions({ name: "TSlider" });

const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  disabled: false,
  min: 0,
  max: 100,
  step: 0.1,
  showStops: false,
  showTooltip: true,
  formatTooltip: (v: number) => String(v),
  range: false,
  vertical: false,
  onlySteps: false,
  height: "medium",
  size: 6,
  marks: () => []
});

// 使用defineModel进行双向绑定
const model = defineModel<number | number[]>();

// 初始化模型默认值
if (model.value === undefined) {
  model.value = props.range ? [props.min, props.max] : props.min;
}

// DOM引用
const sliderRunway = ref<HTMLElement | null>(null);
const buttonWrapper = ref<HTMLElement | null>(null);
const minButtonWrapper = ref<HTMLElement | null>(null);
const maxButtonWrapper = ref<HTMLElement | null>(null);

// 拖动状态
const dragging = ref(false);
const minDragging = ref(false);
const maxDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const startPosition = ref(0);
const newPosition = ref(0);
const oldValue = ref<number | number[]>(props.range ? [props.min, props.max] : props.min);

// 超出范围状态标记
const minOutOfRange = ref(false);
const maxOutOfRange = ref(false);

// 提示框状态
const showTooltip = ref(false);
const showMinTooltip = ref(false);
const showMaxTooltip = ref(false);

// 计算滑块容器样式
const sliderStyle = computed(() => {
  if (props.vertical) {
    return {
      height: typeof props.height === "number" ? `${props.height}px` : props.height
    };
  }
  return {};
});

// 滑块按钮大小
const buttonSize = computed(() => {
  // 按钮大小默认为轨道尺寸的2倍+2px
  return props.size ? props.size * 2 + 2 : 14;
});

// 轨道样式计算
const runwayStyle = computed(() => {
  const style: Record<string, any> = {};
  if (props.size) {
    if (props.vertical) {
      style.width = `${props.size}px`; // 垂直模式控制宽度
    } else {
      style.height = `${props.size}px`; // 水平模式控制高度
    }
  }
  return style;
});

// 已选择部分的轨道样式
const barStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.range) {
    const [min, max] = Array.isArray(model.value) ? model.value : [props.min, props.max];

    // 如果最小值超出最大值或最大值超出最小值，调整显示
    if (minOutOfRange.value || maxOutOfRange.value) {
      if (minDragging.value && min > max) {
        // 最小滑块拖动超过最大值，将宽度设为0
        if (props.vertical) {
          style.bottom = `${valueToPosition(max)}%`;
          style.height = "0%";
        } else {
          style.left = `${valueToPosition(max)}%`;
          style.width = "0%";
        }
      } else if (maxDragging.value && max < min) {
        // 最大滑块拖动小于最小值，将宽度设为0
        if (props.vertical) {
          style.bottom = `${valueToPosition(min)}%`;
          style.height = "0%";
        } else {
          style.left = `${valueToPosition(min)}%`;
          style.width = "0%";
        }
      } else {
        // 常规超出范围处理
        const minPos = Math.max(0, Math.min(100, valueToPosition(min)));
        const maxPos = Math.max(0, Math.min(100, valueToPosition(max)));

        if (props.vertical) {
          style.bottom = `${minPos}%`;
          style.height = `${maxPos - minPos}%`;
        } else {
          style.left = `${minPos}%`;
          style.width = `${maxPos - minPos}%`;
        }
      }
    } else {
      // 常规显示情况
      const minPosition = valueToPosition(min);
      const maxPosition = valueToPosition(max);

      if (props.vertical) {
        style.bottom = `${minPosition}%`;
        style.height = `${maxPosition - minPosition}%`;
      } else {
        style.left = `${minPosition}%`;
        style.width = `${maxPosition - minPosition}%`;
      }
    }
  } else {
    // 单滑块情况保持不变
    const position = valueToPosition(Number(model.value));
    if (props.vertical) {
      style.height = `${position}%`;
    } else {
      style.width = `${position}%`;
    }
  }

  return style;
});

// 计算滑块按钮位置
const wrapperStyle = computed(() => {
  const position = valueToPosition(Number(model.value));
  if (props.vertical) {
    return {
      bottom: `${position}%`
    };
  }
  return {
    left: `${position}%`
  };
});

// 计算范围滑块最小值按钮位置
const minWrapperStyle = computed(() => {
  if (!props.range) return {};
  const [min] = Array.isArray(model.value) ? model.value : [props.min, props.max];
  const position = valueToPosition(min);
  if (props.vertical) {
    return {
      bottom: `${position}%`
    };
  }
  return {
    left: `${position}%`
  };
});

// 计算范围滑块最大值按钮位置
const maxWrapperStyle = computed(() => {
  if (!props.range) return {};
  const [, max] = Array.isArray(model.value) ? model.value : [props.min, props.max];
  const position = valueToPosition(max);
  if (props.vertical) {
    return {
      bottom: `${position}%`
    };
  }
  return {
    left: `${position}%`
  };
});

// 计算步长断点
const stops = computed(() => {
  if (!props.showStops || props.min === props.max || props.step <= 0) return [];

  const stopCount = Math.floor((props.max - props.min) / props.step) + 1;
  const stops: number[] = [];

  // 添加所有步长断点，不再考虑是否在区间内
  for (let i = 1; i < stopCount; i++) {
    const stopValue = props.min + i * props.step;
    if (stopValue < props.max) {
      const stopPosition = valueToPosition(stopValue);
      stops.push(stopPosition);
    }
  }

  return stops;
});

// 获取步长断点样式
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

// 处理标记点
const marks = computed(() => {
  const result: { position: number; label: string | number }[] = [];

  if (Array.isArray(props.marks)) {
    props.marks.forEach(mark => {
      result.push({
        position: valueToPosition(mark.value),
        label: mark.label
      });
    });
  } else if (props.marks) {
    Object.keys(props.marks).forEach(key => {
      const value = Number(key);
      if (!isNaN(value)) {
        const markValue = props.marks![value];
        result.push({
          position: valueToPosition(value),
          label: typeof markValue === "string" ? markValue : String(markValue)
        });
      }
    });
  }

  return result;
});

// 获取标记点样式
const getMarkStyle = (position: number) => {
  if (props.vertical) {
    return {
      bottom: `${position}%`
    };
  }
  return {
    left: `${position}%`
  };
};

// 将值转换为位置
const valueToPosition = (value: number): number => {
  if (props.min === props.max) return 0;
  if (props.vertical) {
    return ((value - props.min) / (props.max - props.min)) * 100;
  }
  return ((value - props.min) / (props.max - props.min)) * 100;
};

// 格式化值显示
const formatValue = (val: number | number[]): string | number => {
  const value = typeof val === "object" ? val[0] : val;

  if (props.formatTooltip) {
    return props.formatTooltip(value);
  }

  return value;
};

// 处理滑块点击
const onSliderClick = (event: MouseEvent) => {
  if (props.disabled) return;
  if (dragging.value || minDragging.value || maxDragging.value) return;

  const sliderRect = sliderRunway.value!.getBoundingClientRect();
  let position: number;

  if (props.vertical) {
    const bottom = sliderRect.bottom;
    position = ((bottom - event.clientY) / sliderRect.height) * 100;
  } else {
    const left = sliderRect.left;
    position = ((event.clientX - left) / sliderRect.width) * 100;
  }

  // 直接调用positionToValue确保值符合步长要求
  const value = positionToValue(position);

  if (props.range) {
    // 范围模式下，点击时判断应该移动哪个滑块
    if (Array.isArray(model.value)) {
      const [min, max] = model.value;
      const middle = (min + max) / 2;
      if (value <= middle) {
        model.value = [value, max];
      } else {
        model.value = [min, value];
      }
    }
  } else {
    model.value = value;
  }

  emit("change", model.value);
};

// 按下按钮
const onButtonDown = (event: MouseEvent | TouchEvent) => {
  if (props.disabled) return;

  event.preventDefault();

  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  startX.value = clientX;
  startY.value = clientY;

  if (props.vertical) {
    startPosition.value = parseFloat(wrapperStyle.value.bottom as string);
  } else {
    startPosition.value = parseFloat(wrapperStyle.value.left as string);
  }

  oldValue.value = model.value;
  dragging.value = true;
  showTooltip.value = true;

  document.addEventListener("mousemove", onDragging);
  document.addEventListener("touchmove", onDragging);
  document.addEventListener("mouseup", onDragEnd);
  document.addEventListener("touchend", onDragEnd);
  document.addEventListener("contextmenu", onDragEnd);
};

// 按下最小值按钮
const onMinButtonDown = (event: MouseEvent | TouchEvent) => {
  if (props.disabled) return;

  event.preventDefault();

  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  startX.value = clientX;
  startY.value = clientY;

  if (props.vertical) {
    startPosition.value = parseFloat(minWrapperStyle.value.bottom as string);
  } else {
    startPosition.value = parseFloat(minWrapperStyle.value.left as string);
  }

  oldValue.value = model.value;
  minDragging.value = true;
  showMinTooltip.value = true;

  document.addEventListener("mousemove", onMinDragging);
  document.addEventListener("touchmove", onMinDragging);
  document.addEventListener("mouseup", onMinDragEnd);
  document.addEventListener("touchend", onMinDragEnd);
  document.addEventListener("contextmenu", onMinDragEnd);
};

// 按下最大值按钮
const onMaxButtonDown = (event: MouseEvent | TouchEvent) => {
  if (props.disabled) return;

  event.preventDefault();

  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  startX.value = clientX;
  startY.value = clientY;

  if (props.vertical) {
    startPosition.value = parseFloat(maxWrapperStyle.value.bottom as string);
  } else {
    startPosition.value = parseFloat(maxWrapperStyle.value.left as string);
  }

  oldValue.value = model.value;
  maxDragging.value = true;
  showMaxTooltip.value = true;

  document.addEventListener("mousemove", onMaxDragging);
  document.addEventListener("touchmove", onMaxDragging);
  document.addEventListener("mouseup", onMaxDragEnd);
  document.addEventListener("touchend", onMaxDragEnd);
  document.addEventListener("contextmenu", onMaxDragEnd);
};

// 拖动处理
const onDragging = bindThrottle((event: MouseEvent | TouchEvent) => {
  if (props.disabled || !dragging.value) return;

  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  const sliderRect = sliderRunway.value!.getBoundingClientRect();
  let diff: number;

  if (props.vertical) {
    diff = ((startY.value - clientY) / sliderRect.height) * 100;
  } else {
    diff = ((clientX - startX.value) / sliderRect.width) * 100;
  }

  newPosition.value = startPosition.value + diff;
  let value = positionToValue(newPosition.value);

  // 如果不是onlySteps模式，那么拖动过程中不强制吸附到步长值
  // 但仍然应该限制精度，避免出现太多小数位
  if (!props.onlySteps && props.step > 0) {
    const precision = Math.max(0, String(props.step).split(".")[1]?.length || 0);
    value = Number(value.toFixed(precision));
  }

  model.value = value;
  emit("input", model.value);
}, 16);

// 最小值拖动处理
const onMinDragging = bindThrottle((event: MouseEvent | TouchEvent) => {
  if (props.disabled || !minDragging.value || !props.range) return;

  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  const sliderRect = sliderRunway.value!.getBoundingClientRect();
  let diff: number;

  if (props.vertical) {
    diff = ((startY.value - clientY) / sliderRect.height) * 100;
  } else {
    diff = ((clientX - startX.value) / sliderRect.width) * 100;
  }

  newPosition.value = startPosition.value + diff;
  let value = positionToValue(newPosition.value);

  // 如果不是onlySteps模式，那么拖动过程中不强制吸附到步长值
  // 但仍然应该限制精度，避免出现太多小数位
  if (!props.onlySteps && props.step > 0) {
    const precision = Math.max(0, String(props.step).split(".")[1]?.length || 0);
    value = Number(value.toFixed(precision));
  }

  if (Array.isArray(model.value)) {
    // 检测是否超出范围
    minOutOfRange.value = value > model.value[1];

    // 允许自由拖动，不限制最小值必须小于最大值
    model.value = [value, model.value[1]];
  }

  emit("input", model.value);
}, 16);

// 最大值拖动处理
const onMaxDragging = bindThrottle((event: MouseEvent | TouchEvent) => {
  if (props.disabled || !maxDragging.value || !props.range) return;

  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  const sliderRect = sliderRunway.value!.getBoundingClientRect();
  let diff: number;

  if (props.vertical) {
    diff = ((startY.value - clientY) / sliderRect.height) * 100;
  } else {
    diff = ((clientX - startX.value) / sliderRect.width) * 100;
  }

  newPosition.value = startPosition.value + diff;
  let value = positionToValue(newPosition.value);

  // 如果不是onlySteps模式，那么拖动过程中不强制吸附到步长值
  // 但仍然应该限制精度，避免出现太多小数位
  if (!props.onlySteps && props.step > 0) {
    const precision = Math.max(0, String(props.step).split(".")[1]?.length || 0);
    value = Number(value.toFixed(precision));
  }

  if (Array.isArray(model.value)) {
    // 检测是否超出范围
    maxOutOfRange.value = value < model.value[0];

    // 允许自由拖动，不限制最大值必须大于最小值
    model.value = [model.value[0], value];
  }

  emit("input", model.value);
}, 16);

// 拖动结束
const onDragEnd = () => {
  if (props.disabled || !dragging.value) return;

  // 确保在拖动结束时应用步长
  if (props.step > 0 && !props.onlySteps) {
    const value = Number(model.value);
    const roundedValue = props.min + Math.round((value - props.min) / props.step) * props.step;
    model.value = Number(Math.max(props.min, Math.min(props.max, roundedValue)).toFixed(5));
  }
  dragging.value = false;
  showTooltip.value = false;

  // 触发change事件
  if (oldValue.value !== model.value) {
    emit("change", model.value);
  }

  document.removeEventListener("mousemove", onDragging);
  document.removeEventListener("touchmove", onDragging);
  document.removeEventListener("mouseup", onDragEnd);
  document.removeEventListener("touchend", onDragEnd);
  document.removeEventListener("contextmenu", onDragEnd);
};

// 最小值拖动结束
const onMinDragEnd = () => {
  if (props.disabled || !minDragging.value) return;

  // 重置超出范围状态
  minOutOfRange.value = false;

  // 确保在拖动结束时应用步长
  if (props.step > 0 && !props.onlySteps && Array.isArray(model.value)) {
    const min = model.value[0];
    const roundedMin = props.min + Math.round((min - props.min) / props.step) * props.step;
    model.value = [Number(Math.max(props.min, Math.min(props.max, roundedMin)).toFixed(5)), model.value[1]];
  }

  // 自动调整起始值和结束值的顺序
  if (Array.isArray(model.value) && model.value[0] > model.value[1]) {
    // 如果起始值大于结束值，交换它们
    model.value = [model.value[1], model.value[0]];
    // 交换拖动状态，使UI显示正确
    const tempDragging = minDragging.value;
    minDragging.value = maxDragging.value;
    maxDragging.value = tempDragging;

    const tempTooltip = showMinTooltip.value;
    showMinTooltip.value = showMaxTooltip.value;
    showMaxTooltip.value = tempTooltip;
  }

  minDragging.value = false;
  showMinTooltip.value = false;

  // 触发change事件
  if (oldValue.value !== model.value) {
    emit("change", model.value);
  }

  document.removeEventListener("mousemove", onMinDragging);
  document.removeEventListener("touchmove", onMinDragging);
  document.removeEventListener("mouseup", onMinDragEnd);
  document.removeEventListener("touchend", onMinDragEnd);
  document.removeEventListener("contextmenu", onMinDragEnd);
};

// 最大值拖动结束
const onMaxDragEnd = () => {
  if (props.disabled || !maxDragging.value) return;

  // 重置超出范围状态
  maxOutOfRange.value = false;

  // 确保在拖动结束时应用步长
  if (props.step > 0 && !props.onlySteps && Array.isArray(model.value)) {
    const max = model.value[1];
    const roundedMax = props.min + Math.round((max - props.min) / props.step) * props.step;
    model.value = [model.value[0], Number(Math.max(props.min, Math.min(props.max, roundedMax)).toFixed(5))];
  }

  // 自动调整起始值和结束值的顺序
  if (Array.isArray(model.value) && model.value[0] > model.value[1]) {
    // 如果起始值大于结束值，交换它们
    model.value = [model.value[1], model.value[0]];
    // 交换拖动状态，使UI显示正确
    const tempDragging = minDragging.value;
    minDragging.value = maxDragging.value;
    maxDragging.value = tempDragging;

    const tempTooltip = showMinTooltip.value;
    showMinTooltip.value = showMaxTooltip.value;
    showMaxTooltip.value = tempTooltip;
  }

  maxDragging.value = false;
  showMaxTooltip.value = false;

  // 触发change事件
  if (oldValue.value !== model.value) {
    emit("change", model.value);
  }

  document.removeEventListener("mousemove", onMaxDragging);
  document.removeEventListener("touchmove", onMaxDragging);
  document.removeEventListener("mouseup", onMaxDragEnd);
  document.removeEventListener("touchend", onMaxDragEnd);
  document.removeEventListener("contextmenu", onMaxDragEnd);
};

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener("mousemove", onDragging);
  document.removeEventListener("touchmove", onDragging);
  document.removeEventListener("mouseup", onDragEnd);
  document.removeEventListener("touchend", onDragEnd);
  document.removeEventListener("contextmenu", onDragEnd);

  document.removeEventListener("mousemove", onMinDragging);
  document.removeEventListener("touchmove", onMinDragging);
  document.removeEventListener("mouseup", onMinDragEnd);
  document.removeEventListener("touchend", onMinDragEnd);
  document.removeEventListener("contextmenu", onMinDragEnd);

  document.removeEventListener("mousemove", onMaxDragging);
  document.removeEventListener("touchmove", onMaxDragging);
  document.removeEventListener("mouseup", onMaxDragEnd);
  document.removeEventListener("touchend", onMaxDragEnd);
  document.removeEventListener("contextmenu", onMaxDragEnd);
});

// 位置转换为值
const positionToValue = (position: number): number => {
  // 从位置百分比转换为实际值
  const range = props.max - props.min;

  // 根据步长进行调整
  let value = props.min + (position * range) / 100;

  if (props.step > 0) {
    // 对齐到最近的步长值，确保始终对齐到步长的倍数
    value = props.min + Math.round((value - props.min) / props.step) * props.step;
  }

  // 确保值在允许范围内
  value = Math.max(props.min, Math.min(props.max, value));

  // 格式化为固定小数位数，避免浮点数精度问题
  return Number(value.toFixed(5));
};
</script>

<style lang="scss" scoped>
@import "./index.scss";

// 根据size属性动态调整滑块样式
.t-slider {
  &__button {
    width: v-bind("buttonSize + 'px'");
    height: v-bind("buttonSize + 'px'");
  }
}
</style>
