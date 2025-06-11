<template>
  <div :class="switchClasses" @click="handleClick">
    <div class="_bg _bg1" :style="{ backgroundColor: props.offBgColor }">
      <slot name="offContent" />
    </div>
    <div class="_bg _bg2" :style="{ backgroundColor: props.onBgColor }">
      <slot name="onContent" />
    </div>
    <div class="_action">
      <t-icon v-if="props.loading" icon="loading" :class="`${props.loading && 't-loading'}`" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { EmitsType, PropsType } from "./switch";
import { computed } from "vue";
import { TIcon } from "@/packages/icon";
import { configOptions, useOptions } from "@/hooks/useOptions";

defineOptions({ name: "TSwitch" });

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  loading: false,
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
const model = defineModel<boolean>();

/**
 * 计算开关样式
 * @returns {string[]} 开关样式类名数组
 */
const switchClasses = computed((): string[] => {
  const { radius, disabled, loading } = props;
  return [
    "t-switch",
    `t-switch-${model.value ? "on" : "off"}`,
    `t-switch-size-${baseSize.value}`,
    `t-switch-radius-${radius}`,
    (disabled || loading) && "t-disabled"
  ];
});

/**
 * 处理点击事件
 */
const handleClick = () => {
  if (!props.disabled && !props.loading) {
    model.value = !model.value;
    emit("change", model.value);
  }
};
</script>
