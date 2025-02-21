<template>
  <div :class="getClass" @click="emit('change', props)">
    <slot>{{ props.label }}</slot>
  </div>
</template>
<script lang="ts" setup>
import { inject } from "vue";
import { EmitsType, PropsType } from "./option";
import { GroupContextType, selectGroupKey } from "./constants";
import { computed } from "vue";
import { isEqual, isValue } from "@/utils/is";
import { SingleValueType } from "./select";
defineOptions({ name: "TSelectOption" });
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {});
const groupContext = inject<GroupContextType | undefined>(selectGroupKey, void 0);
const getClass = computed(() => {
  const { disabled, value } = props;
  const { model, temModel, multiple } = groupContext;
  const groupValue = isValue(model) ? model : temModel;
  console.log(groupValue);
  let isActive = false;
  if (multiple) {
    isActive = (groupValue as SingleValueType[]).includes(value);
  } else {
    isActive = isEqual(groupValue, value);
  }
  return ["t-option", isActive && "_active", disabled && "t-disabled"];
});
</script>
<style lang="scss" scoped>
@import "option.scss";
</style>
