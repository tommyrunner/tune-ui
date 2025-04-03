<template>
  <div :class="['t-flex-group']" :style="groupStyle">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { StyleValue } from "vue";
import type { PropsType } from "./flex-group";
import { computed } from "vue";

defineOptions({ name: "TFlexGroup" });

const props = withDefaults(defineProps<PropsType>(), {
  gap: 12,
  justify: "start"
});

/**
 * 计算FlexGroup样式
 */
const groupStyle = computed((): StyleValue => {
  const { gap, align, justify } = props;
  return {
    gap: `${gap}px`,
    alignItems: align,
    justifyContent: justify
  };
});
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
