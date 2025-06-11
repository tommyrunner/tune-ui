<template>
  <div :style="rateStyles" :class="rateClasses" @mouseenter="handleParentEnter" @mouseleave="handleParentLeave">
    <t-icon
      :class="['t-rate-icon', props.disabled && 't-disabled']"
      v-for="i in props.max"
      :key="i"
      :icon="getIcon(i)"
      :color="iconColor"
      :size="ICON_SIZES[baseSize]"
      @mouseenter="handleIconEnter(i)"
      @mousemove="handleIconMove($event, i)"
      @click="handleIconClick"
    />
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { EmitsType, PropsType } from "./rate";
import type { StyleValue } from "vue";
import { type IconTypes, TIcon } from "@/packages/icon";
import { computed, ref } from "vue";
import { configOptions, useOptions } from "@/hooks/useOptions";
import { ICON_SIZES } from "./rate";

defineOptions({ name: "TRate" });

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  max: 5,
  gap: 5,
  isHalf: true,
  disabled: false
});

/** 基础尺寸 */
const { baseSize } = useOptions(props);

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/**
 * @description v-model定义
 */
const model = defineModel<number>();

/** 显示值 */
const showValue = ref<number>();

/** 是否悬浮父容器 */
const isHoverParent = ref(false);

/**
 * 计算图标颜色
 * @returns {string} 图标颜色值
 */
const iconColor = computed((): string => {
  if (!props.color) return "#f4ba3b";
  const value = showValue.value || model.value;
  const keys = Object.keys(props.color);
  for (let i = keys.length - 1; i > 0; i--) {
    if (value >= Number(keys[i])) return props.color[keys[i]];
  }
  return "#f4ba3b";
});

/**
 * 计算容器类名
 * @returns {string[]} 容器样式类名数组
 */
const rateClasses = computed((): string[] => {
  const { disabled } = props;
  return ["t-rate", `t-rate-size-${baseSize.value}`, disabled && "t-disabled"];
});

/**
 * 计算容器样式
 * @returns {StyleValue} 容器样式对象
 */
const rateStyles = computed(
  (): StyleValue => ({
    gap: `${props.gap}px`
  })
);

/**
 * 获取图标类型
 * @param {number} index - 图标索引
 * @returns {string} 图标类型
 */
const getIcon = (index: number): IconTypes => {
  const value = showValue.value || model.value;
  const { empty, half, show } = props.icon || {};
  const defaultIcon = empty || half || show;

  const icons = {
    empty: empty || defaultIcon || "rate-null",
    half: half || defaultIcon || "rate-half",
    show: show || defaultIcon || "rate"
  };

  return value >= index - 0.5 ? (props.isHalf && value === index - 0.5 ? icons.half : icons.show) : icons.empty;
};

/**
 * 处理图标鼠标进入
 * @param {number} index - 图标索引
 */
const handleIconEnter = (index: number) => {
  if (props.disabled) return;
  showValue.value = index;
};

/**
 * 处理图标鼠标移动
 * @param {MouseEvent} event - 鼠标事件
 * @param {number} index - 图标索引
 */
const handleIconMove = (event: MouseEvent, index: number) => {
  if (props.disabled) return;
  const target = event.target as HTMLDivElement;
  const { left, width } = target.getBoundingClientRect();
  const centerX = left + width / 2;
  showValue.value = event.clientX < centerX ? index - 0.5 : index;
};

/**
 * 处理父容器鼠标进入
 */
const handleParentEnter = () => {
  isHoverParent.value = true;
};

/**
 * 处理父容器鼠标离开
 */
const handleParentLeave = () => {
  isHoverParent.value = false;
  showValue.value = 0;
};

/**
 * 处理图标点击
 */
const handleIconClick = () => {
  if (model.value === showValue.value) {
    model.value = 0;
    showValue.value = 0;
  } else {
    model.value = showValue.value;
  }
  emit("change", model.value);
};
</script>
