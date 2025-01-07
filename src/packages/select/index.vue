<template>
  <div :class="getClass">
    <TInput />
  </div>
</template>
<script lang="ts" setup>
import type { EmitsType, PropsType } from "./select";
import type { ElSizeType } from "@/types";
import { configOptions } from "@/hooks/useOptions";
import { computed } from "vue";
import { TInput } from "@/packages/input";
defineOptions({ name: "TSelect" });
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  debounce: undefined,
  isTipe: true,
  clearable: true,
  size: configOptions.value.elSize,
  disabled: false,
  debounceDelay: 1000
});
const model = defineModel<string>();

const getClass = computed(() => {
  const { size } = props;
  return ["t-select", `t-select-size-${size}`];
});
const sizes: { [key in ElSizeType]: number } = {
  default: 16,
  small: 14,
  large: 18
};
const defIconColor = "#656a6e88";
const getIconSize = computed(() => {
  return sizes[props.size];
});
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
