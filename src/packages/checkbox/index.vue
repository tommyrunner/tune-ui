<template>
  <span :class="checkboxClasses" :checked="isChecked" @click="handleChecked">
    <div v-if="!icon && slot.checkboxSpan">
      <slot name="checkboxSpan" :value="model" />
    </div>
    <span :class="['_span', `_span-${radius}`]" v-else-if="!icon">
      <t-icon :icon="checkIcon" color="white" v-if="isChecked" />
    </span>
    <t-icon class="_icon" :icon="icon" v-else />
    <input type="checkbox" :name="name" :value="value" />
    <span :class="titleClasses"><slot /></span>
  </span>
</template>

<script lang="ts" setup>
import "./index.scss";
import type { PropsType, EmitsType, ValueType } from "./checkbox";
import type { GroupContextType } from "./constants";
import { computed, inject, onMounted, useSlots } from "vue";
import { configOptions, useOptions } from "@/hooks/useOptions";
import { isUnDef } from "@/utils/is";
import { checkboxGroupKey } from "./constants";
import { TIcon } from "@/packages/icon";

defineOptions({ name: "TCheckbox" });

// 基础尺寸
const { baseSize } = useOptions();

const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  radius: "square",
  value: false,
  disabled: false
});

const emit = defineEmits<EmitsType>();
const slot = useSlots();
const model = defineModel<ValueType>();
const groupContext = inject<GroupContextType | undefined>(checkboxGroupKey, void 0);

// 生命周期
onMounted(() => {
  model.value = props.value;
});

/**
 * 计算标题类名
 */
const titleClasses = computed(() => {
  return ["_title", props.disabled && "t-disabled", (slot.checkboxSpan || props.icon) && "_custom-span"];
});

/**
 * 计算复选框类名
 */
const checkboxClasses = computed(() => {
  const { disabled } = props;
  const base = ["t-checkbox", `t-checkbox-size-${baseSize.value}`, disabled && "t-disabled"];

  if (groupContext) {
    return [...base, `_type-${groupContext.type}`, `_direction-${groupContext.direction}`];
  }
  return base;
});

/**
 * 计算半选图标
 */
const checkIcon = computed(() => {
  const { indeterminate, indeterminateIcon, icon } = props;
  return indeterminate ? indeterminateIcon ?? "minus" : icon ?? "success";
});

/**
 * 计算对象key
 */
const modelObjKey = computed((): string => {
  return groupContext?.objKey || props.objKey || "";
});

/**
 * 计算选中状态
 */
const isChecked = computed(() => {
  // model值
  const visValue = groupContext?.objKey && model.value ? (model.value as any)[modelObjKey.value] : model.value;
  // 组件绑定value值
  const propValue = modelObjKey.value ? (props.value as any)[modelObjKey.value] : props.value;
  // 如果是组合组件
  if (groupContext && groupContext.model) {
    // 是对象属性
    if (modelObjKey.value) {
      return groupContext.model.some((v: any) => v[modelObjKey.value] === propValue);
    } else {
      return groupContext.model.includes(propValue);
    }
  } else {
    // 未值定value默认以boolean类型
    if (typeof model.value === "boolean" && !props.value) return model.value;
    // 是对象属性
    if (modelObjKey.value && model.value) {
      return (model.value as any)[modelObjKey.value] === propValue;
    } else return visValue === propValue;
  }
});

/**
 * 处理选中事件
 */
const handleChecked = () => {
  if (props.disabled) return;

  if (groupContext) {
    groupContext.changeEvent(isChecked.value, props.value);
  } else {
    if (isUnDef(model.value)) {
      model.value = true;
    } else if (typeof model.value === "boolean" && !props.value) {
      model.value = !model.value;
    } else {
      model.value = isChecked.value ? void 0 : props.value;
    }
  }
  emit("change", model.value);
};
</script>
