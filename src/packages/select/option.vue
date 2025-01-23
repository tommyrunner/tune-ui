<template>
  <div :class="getClass" :key="props.value" @click="emit('change', props)">
    {{ props.label }}
  </div>
</template>
<script lang="ts" setup>
import { inject } from "vue";
import { EmitsType, PropsType } from "./option";
import { GroupContextType } from "./constants";
import { selectKey } from "element-plus";
import { computed } from "vue";
defineOptions({ name: "TSelectOption" });
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {});
const groupContext = inject<GroupContextType | undefined>(selectKey, void 0);
const getClass = computed(() => {
  const isActive = groupContext.model === props.value;
  return ["t-option", isActive && "_active"];
});
</script>
<style lang="scss" scoped>
@import "option.scss";
</style>
