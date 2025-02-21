<template>
  <div :class="tagClasses">
    <t-icon
      v-if="props.prefixIcon"
      :icon="props.prefixIcon"
      :size="iconSize"
      class="_prefix-icon"
      @click.stop="handleClickPrefix"
    />
    <slot />
    <t-icon
      v-if="props.suffixIcon"
      :icon="props.suffixIcon"
      :size="iconSize"
      class="_suffix-icon"
      @click.stop="handleClickSuffix"
    />
  </div>
</template>

<script lang="ts" setup>
import type { EmitsType, PropsType } from "./tag";
import { computed } from "vue";
import { configOptions } from "@/hooks/useOptions";
import { TIcon } from "@/packages/icon";
import { ICON_SIZES } from "./tag";

defineOptions({ name: "TTag" });

// Props 定义
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  type: "default",
  round: false,
  disabled: false
});

// Emits 定义
const emit = defineEmits<EmitsType>();

/**
 * 处理前缀图标点击
 */
const handleClickPrefix = () => {
  if (!props.disabled) {
    emit("click-prefix");
  }
};

/**
 * 处理后缀图标点击
 */
const handleClickSuffix = () => {
  if (!props.disabled) {
    emit("click-suffix");
  }
};

/**
 * 计算标签类名
 */
const tagClasses = computed(() => {
  const { type, size, round, disabled } = props;

  return ["t-tag", `t-tag-type-${type}`, `t-tag-size-${size}`, round && "t-tag-round", disabled && "t-disabled"];
});

/**
 * 计算图标尺寸
 */
const iconSize = computed(() => ICON_SIZES[props.size]);
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
