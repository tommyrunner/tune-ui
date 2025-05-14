<template>
  <div :class="tagClasses">
    <slot />
    <t-icon
      v-if="props.closable"
      icon="close"
      :size="ICON_SIZES[baseSize]"
      class="_suffix-icon"
      @click.stop="handleClickSuffix"
    />
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { EmitsType, PropsType } from "./tag";
import { computed } from "vue";
import { configOptions, useOptions } from "@/hooks/useOptions";
import { TIcon } from "@/packages/icon";
import { ICON_SIZES } from "./tag";

defineOptions({ name: "TTag" });

// 基础尺寸
const { baseSize } = useOptions();

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
 * 处理关闭事件
 */
const handleClickSuffix = () => {
  if (!props.disabled) {
    emit("close");
  }
};

/**
 * 计算标签类名
 */
const tagClasses = computed(() => {
  const { type, round, disabled } = props;

  return ["t-tag", `t-tag-type-${type}`, `t-tag-size-${baseSize.value}`, round && "t-tag-round", disabled && "t-disabled"];
});
</script>
