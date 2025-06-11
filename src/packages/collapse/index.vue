<template>
  <div class="t-collapse">
    <div :class="['_head', props.disabled && 't-disabled']" @click="handleClick">
      <slot name="title" :value="model">
        <div>{{ title }}</div>
      </slot>
      <div class="_head-right">
        <slot name="headRight" :value="model">
          <t-icon :class="isChecked && '_icon-active'" :icon="rightIcon" :size="14" />
        </slot>
      </div>
    </div>
    <div class="_body" ref="bodyRef" :style="bodyStyle">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss";

import type { StyleValue } from "vue";
import type { PropsType, ValueType, EmitsType } from "./collapse";
import type { GroupContextType } from "./constants";

import { computed, inject, onMounted, ref } from "vue";
import { collapseGroupKey } from "./constants";
import { TIcon } from "@/packages/icon";

defineOptions({ name: "TCollapse" });

const props = withDefaults(defineProps<PropsType>(), {
  value: false,
  rightIcon: "caret-right"
});

const emit = defineEmits<EmitsType>();
const model = defineModel<ValueType>();
const groupContext = inject<GroupContextType | undefined>(collapseGroupKey, void 0);

/**
 * @description DOM引用
 */
const bodyRef = ref<HTMLDivElement>();
const bodyHeight = ref(0);

/**
 * @description 生命周期 - 获取内容区高度
 * @returns {void}
 */
onMounted(() => {
  bodyHeight.value = bodyRef.value?.clientHeight || 0;
});

/**
 * @description 计算是否选中
 * @returns {boolean} 选中状态
 */
const isChecked = computed((): boolean => {
  if (groupContext?.model) {
    return groupContext.model.includes(props.value);
  }

  if (typeof model.value === "boolean" && !props.value) {
    return model.value;
  }

  return model.value === props.value;
});

/**
 * @description 计算内容区样式
 * @returns {StyleValue} 样式对象
 */
const bodyStyle = computed((): StyleValue => {
  if (!bodyHeight.value) {
    return { height: "auto" };
  }
  return { height: `${isChecked.value ? bodyHeight.value : 0}px` };
});

/**
 * @description 处理点击事件
 * @returns {void}
 */
const handleClick = (): void => {
  if (props.disabled) return;

  if (groupContext) {
    groupContext.changeEvent(isChecked.value, props.value);
  } else {
    if (typeof model.value === "boolean" && !props.value) {
      model.value = !model.value;
    } else {
      model.value = isChecked.value ? void 0 : props.value;
    }
  }

  emit("change", props.value);
};
</script>
