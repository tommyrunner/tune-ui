<template>
  <div :class="['t-flex-group']" :style="getStyle">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import type { PropsType } from "./flex-group";
import { type StyleValue, computed } from "vue";
defineOptions({ name: "TFlexGroup" });
const props = withDefaults(defineProps<PropsType>(), {
  gap: 12,
  justify: "start"
});
const getStyle = computed((): StyleValue => {
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
