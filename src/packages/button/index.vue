<template>
  <button :class="buttonClasses" :style="buttonStyles" @click="handleClick" :type="props.htmlType">
    <t-icon v-if="props.prefixIcon" :icon="props.prefixIcon" :size="ICON_SIZES[baseSize]" class="_prefixIcon" />
    <slot />
    <t-icon
      v-if="props.suffixIcon || props.loading"
      :icon="loadingIcon"
      :size="ICON_SIZES[baseSize]"
      :class="['_suffixIcon', props.loading && 't-loading']"
    />
  </button>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { StyleValue } from "vue";
import type { EmitsType, PropsType } from "./button";
import type { IconTypes } from "@/packages/icon/icon";
import { computed } from "vue";
import { ICON_SIZES } from "./button";
import { TIcon } from "@/packages/icon";
import { useOptions, configOptions } from "@/hooks/useOptions";
/**
 * @description 按钮组件
 */
defineOptions({ name: "TButton" });
// 基础尺寸
const { baseSize } = useOptions();

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  type: "default",
  loading: false,
  radius: "default",
  disabled: false,
  scale: true,
  htmlType: "button"
});

/**
 * @description 组件事件定义
 */
const emit = defineEmits<EmitsType>();

/**
 * @description 计算加载状态图标
 * @returns {IconTypes} 图标类型
 */
const loadingIcon = computed((): IconTypes => {
  return !props.loading && props.suffixIcon ? props.suffixIcon : "loading";
});

/**
 * @description 处理按钮点击事件
 * @param {MouseEvent} event - 鼠标事件对象
 * @returns {void}
 */
const handleClick = (event: MouseEvent): void => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};

/**
 * @description 计算按钮样式
 * @returns {StyleValue | undefined} 按钮样式对象
 */
const buttonStyles = computed((): StyleValue => {
  if (!props.color) return undefined;

  return {
    color: "#ffffff",
    backgroundColor: props.color,
    border: `1px solid ${props.color}`
  };
});

/**
 * @description 计算按钮类名
 * @returns {string[]} 类名数组
 */
const buttonClasses = computed((): string[] => {
  const { color, type, radius, scale, disabled, loading } = props;

  return [
    "t-button",
    !color && `t-button-type-${type}`,
    `t-button-size-${baseSize.value}`,
    `t-button-radius-${radius}`,
    scale && !disabled && "t-button-scale",
    (disabled || loading) && "t-disabled"
  ];
});

// 对外暴露方法
defineExpose({
  handleClick
});
</script>
