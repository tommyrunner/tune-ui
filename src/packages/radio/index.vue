<template>
  <span :class="getClass" :checked="isChecked" @click="handChecked">
    <div v-if="!props.icon && slot.radioSpan">
      <slot name="radioSpan" :value="model" />
    </div>
    <span :class="['_span', `_span-${props.radius}`]" v-else-if="!props.icon" />
    <TIcon class="_icon" :icon="props.icon" v-else />
    <input type="radio" :name="props.name" :value="props.value" />
    <span :class="getTitleClass"><slot /></span>
  </span>
</template>
<script lang="ts" setup>
import type { PropsType, ValueType, EmitsType } from "./radio";
import { type GroupContextType, radioGroupKey } from "./constants";
import { TIcon } from "../icon";
import { computed, inject, onMounted, useSlots } from "vue";
import { configOptions } from "@/hooks/useOptions";
import { isObject } from "@/utils/is";
defineOptions({ name: "TRadio" });
const emit = defineEmits<EmitsType>();
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  radius: "default",
  value: false,
  disabled: false
});
const slot = useSlots();
const model = defineModel<ValueType>();
const groupContext = inject<GroupContextType | undefined>(radioGroupKey, void 0);
// 默认赋值
onMounted(() => (model.value = props.value));
/**
   span的class配置
   custom-span 代表有自定义组件代替了span，需要修复样式
 **/
const getTitleClass = computed(() => {
  const base = ["_title", props.disabled && "t-disabled", (slot.radioSpan || props.icon) && "_custom-span"];
  return base;
});
const getClass = computed(() => {
  const { size, disabled } = props;
  const base = ["t-radio", `t-radio-size-${size}`, disabled && "t-disabled"];
  // 组合样式
  if (groupContext) {
    return [...base, `_type-${groupContext.type}`, `_direction-${groupContext.direction}`];
  }
  return base;
});
/**
 * 组合使用时会失效
 */
const isChecked = computed(() => {
  // 处理对象类型
  if (isObject(modelValue.value) && modelObjKey.value) {
    return (props.value as any)[modelObjKey.value] === (modelValue.value as any)[modelObjKey.value];
  } else {
    // 未值定value默认以boolean类型
    if (typeof model.value === "boolean" && !props.value) return model.value;
    return props.value === modelValue.value;
  }
});
// 兼容个体以及组合
const modelValue = computed(() => {
  if (groupContext) return groupContext.model;
  return model.value;
});
const modelObjKey = computed(() => {
  if (groupContext) return groupContext.objKey;
  return props.objKey;
});
const handChecked = () => {
  if (props.disabled) return;
  if (groupContext) {
    groupContext.changeEvent(props.value);
  } else {
    // 未值定value默认以boolean类型
    if (typeof model.value === "boolean" && !props.value) model.value = !model.value;
    // 则
    else model.value = props.value;
  }
  emit("change", model.value);
};
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
