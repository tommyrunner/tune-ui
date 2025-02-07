<template>
  <div class="t-collapse">
    <div class="_head" @click="handleClick">
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
 * DOM引用
 */
const bodyRef = ref<HTMLDivElement>();
const bodyHeight = ref(0);

/**
 * 生命周期
 */
onMounted(() => {
  bodyHeight.value = bodyRef.value?.clientHeight || 0;
});

/**
 * 计算是否选中
 */
const isChecked = computed(() => {
  if (groupContext?.model) {
    return groupContext.model.includes(props.value);
  }

  if (typeof model.value === "boolean" && !props.value) {
    return model.value;
  }

  return model.value === props.value;
});

/**
 * 计算内容区样式
 */
const bodyStyle = computed((): StyleValue => {
  if (!bodyHeight.value) {
    return { height: "auto" };
  }
  return { height: `${isChecked.value ? bodyHeight.value : 0}px` };
});

/**
 * 处理点击事件
 */
const handleClick = () => {
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

<style lang="scss" scoped>
@import "index.scss";
</style>
