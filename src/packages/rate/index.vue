<template>
  <div :style="rateStyles" :class="rateClasses" @mouseenter="handleParentEnter" @mouseleave="handleParentLeave">
    <t-icon
      v-for="i in props.max"
      :key="i"
      :icon="getIcon(i)"
      :color="iconColor"
      :size="iconSize"
      @mouseenter="handleIconEnter(i)"
      @mousemove="handleIconMove($event, i)"
      @click="handleIconClick"
    />
  </div>
</template>

<script lang="ts" setup>
import type { EmitsType, PropsType } from "./rate";
import { computed, ref, type StyleValue } from "vue";
import { configOptions } from "@/hooks/useOptions";
import { TIcon } from "@/packages/icon";

defineOptions({ name: "TRate" });

/** Props定义 */
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  max: 5,
  gap: 5,
  isHalf: true,
  disabled: false
});

/** Emits定义 */
const emit = defineEmits<EmitsType>();

/** 双向绑定 */
const model = defineModel<number>();

/** 显示值 */
const showValue = ref<number>();

/** 是否悬浮父容器 */
const isHoverParent = ref(false);

/** 图标尺寸配置 */
const sizeMap = {
  default: 16,
  small: 14,
  large: 18
};

/** 计算图标颜色 */
const iconColor = computed(() => {
  if (!props.color) return "#f4ba3b";
  const value = showValue.value || model.value;
  const keys = Object.keys(props.color);
  for (let i = keys.length - 1; i > 0; i--) {
    if (value >= Number(keys[i])) return props.color[keys[i]];
  }
  return "#f4ba3b";
});

/** 计算图标尺寸 */
const iconSize = computed(() => sizeMap[props.size]);

/** 计算容器样式 */
const rateClasses = computed(() => {
  const { disabled } = props;
  return ["t-rate", disabled && "t-disabled"];
});

/** 计算容器样式 */
const rateStyles = computed(
  (): StyleValue => ({
    gap: `${props.gap}px`
  })
);

/** 获取图标类型 */
const getIcon = (index: number) => {
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

/** 处理图标鼠标进入 */
const handleIconEnter = (index: number) => {
  showValue.value = index;
};

/** 处理图标鼠标移动 */
const handleIconMove = (event: MouseEvent, index: number) => {
  const target = event.target as HTMLDivElement;
  const { left, width } = target.getBoundingClientRect();
  const centerX = left + width / 2;
  showValue.value = event.clientX < centerX ? index - 0.5 : index;
};

/** 处理父容器鼠标事件 */
const handleParentEnter = () => {
  isHoverParent.value = true;
};

const handleParentLeave = () => {
  isHoverParent.value = false;
  showValue.value = 0;
};

/** 处理图标点击 */
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

<style lang="scss" scoped>
@import "index.scss";
</style>
