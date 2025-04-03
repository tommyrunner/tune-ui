<template>
  <span :class="radioClasses" :checked="isChecked" @click="handleChecked">
    <div v-if="!props.icon && slot.radioSpan">
      <slot name="radioSpan" :value="model" />
    </div>
    <span :class="['_span', `_span-${props.radius}`]" v-else-if="!props.icon" />
    <t-icon class="_icon" :icon="props.icon" v-else />
    <input type="radio" :name="props.name" :value="props.value" />
    <span :class="titleClasses"><slot /></span>
  </span>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { PropsType, ValueType, EmitsType } from "./radio";
import type { GroupContextType } from "./constants";
import { computed, inject, onMounted, useSlots } from "vue";
import { radioGroupKey } from "./constants";
import { configOptions } from "@/hooks/useOptions";
import { isObject } from "@/utils/is";
import { TIcon } from "@/packages/icon";

defineOptions({ name: "TRadio" });

/** Props定义 */
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  radius: "default",
  value: false,
  disabled: false
});

/** Emits定义 */
const emit = defineEmits<EmitsType>();

/** 插槽 */
const slot = useSlots();

/** 双向绑定 */
const model = defineModel<ValueType>();

/** 注入group上下文 */
const groupContext = inject<GroupContextType | undefined>(radioGroupKey, void 0);

/** 初始化默认值 */
onMounted(() => (model.value = props.value));

/** 计算标题样式 */
const titleClasses = computed(() => {
  const base = ["_title", props.disabled && "t-disabled", (slot.radioSpan || props.icon) && "_custom-span"];
  return base;
});

/** 计算radio样式 */
const radioClasses = computed(() => {
  const { size, disabled } = props;
  const base = ["t-radio", `t-radio-size-${size}`, disabled && "t-disabled"];

  if (groupContext) {
    return [...base, `_type-${groupContext.type}`, `_direction-${groupContext.direction}`];
  }
  return base;
});

/** 计算是否选中 */
const isChecked = computed(() => {
  if (isObject(modelValue.value) && modelObjKey.value) {
    return (props.value as any)[modelObjKey.value] === (modelValue.value as any)[modelObjKey.value];
  } else {
    if (typeof model.value === "boolean" && !props.value) return model.value;
    return props.value === modelValue.value;
  }
});

/** 计算当前值 */
const modelValue = computed(() => {
  if (groupContext) return groupContext.model;
  return model.value;
});

/** 计算对象key */
const modelObjKey = computed(() => {
  if (groupContext) return groupContext.objKey;
  return props.objKey;
});

/** 处理选中事件 */
const handleChecked = () => {
  if (props.disabled) return;
  if (groupContext) {
    groupContext.changeEvent(props.value);
  } else {
    if (typeof model.value === "boolean" && !props.value) model.value = !model.value;
    else model.value = props.value;
  }
  emit("change", model.value);
};
</script>
