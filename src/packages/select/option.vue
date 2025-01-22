<template>
  <div class="t-option" :key="props.value" @click="emit('change', props)">
    {{ props.label }}
  </div>
</template>
<script lang="ts" setup>
import { EmitsType, PropsType } from "./option";
defineOptions({ name: "TSelectOption" });
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {});
</script>
<style lang="scss" scoped>
@import "option.scss";
</style>
