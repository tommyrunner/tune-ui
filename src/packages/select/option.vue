<template>
  <div class="t-option" :key="props.value">
    {{ props.label }}
  </div>
</template>
<script lang="ts" setup>
import { PropsType } from "./option";

defineOptions({ name: "TSelectOption" });
const props = withDefaults(defineProps<PropsType>(), {});
</script>
<style lang="scss" scoped>
@import "option.scss";
</style>
