<template>
  <div :class="getClass" @click="emit('change', props)">
    {{ props.label }}
  </div>
</template>
<script lang="ts" setup>
import { inject } from "vue";
import { EmitsType, PropsType } from "./option";
import { GroupContextType } from "./constants";
import { selectKey } from "element-plus";
import { computed } from "vue";
import { isEqual } from "@/utils/is";
defineOptions({ name: "TSelectOption" });
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {});
const groupContext = inject<GroupContextType | undefined>(selectKey, void 0);
const getClass = computed(() => {
  const isActive = isEqual(groupContext.model, props.value);
  return ["t-option", isActive && "_active"];
});
</script>
<style lang="scss" scoped>
@import "option.scss";
</style>
