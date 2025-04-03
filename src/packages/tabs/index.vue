<template>
  <span :class="tabsClasses" :checked="isChecked" @click="handleChecked" ref="tabsRef">
    <t-icon :icon="props.icon" v-if="props.icon" :size="18" />
    <span :class="labelClasses"><slot /></span>
    <t-icon class="_icon-close" icon="close" v-if="groupContext.isClose" :size="10" @click="handleClose" />
  </span>
</template>

<script lang="ts" setup>
import type { PropsType } from "./tabs";
import type { GroupContextType } from "./constants";
import { computed, inject, onMounted, ref } from "vue";
import { tabsGroupKey } from "./constants";
import { isValue } from "@/utils/is";
import { TIcon } from "@/packages/icon";
import "./index.scss";

defineOptions({ name: "TTabs" });

/** Props定义 */
const props = withDefaults(defineProps<PropsType>(), {
  disabled: false
});

/** 组件引用 */
const tabsRef = ref<HTMLElement>();

/** 注入group上下文 */
const groupContext = inject<GroupContextType | undefined>(tabsGroupKey, {});

/** 计算标签样式 */
const labelClasses = computed(() => {
  return ["_label", props.disabled && "t-disabled"];
});

/** 计算tabs样式 */
const tabsClasses = computed(() => {
  const { disabled } = props;
  const { gap, type } = groupContext;
  return ["t-tabs", disabled && "t-disabled", gap <= 0 && "t-tabs-full", `t-tabs-type-${type}`];
});

/** 计算是否选中 */
const isChecked = computed(() => {
  return props.value === groupContext.model;
});

/** 处理选中事件 */
const handleChecked = () => {
  if (props.disabled) return;
  groupContext.changeEvent(tabsRef.value, props.value, true, true);
};

/** 处理关闭事件 */
const handleClose = () => {
  if (isChecked.value) {
    groupContext.changeEvent(tabsRef.value, props.value, false, false);
  }
  groupContext.handleClose(props.value);
};

/** 初始化选中状态 */
onMounted(() => {
  if (!isValue(groupContext)) {
    console.warn("The tabs component is missing the tabs-group component");
    return;
  }
  if (isChecked.value) handleChecked();
});
</script>
