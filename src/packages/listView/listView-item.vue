<template>
  <li :class="getListViewItemClass" :style="getListViewItemStyle" ref="listViewItemRef">
    <slot />
  </li>
</template>
<script lang="ts" setup>
import type { PropsType } from "./listView-item";
import { computed, ref, StyleValue } from "vue";
defineOptions({ name: "TListViewItem" });
const props = withDefaults(defineProps<PropsType>(), {
  isVirtualized: false,
  disabled: false
});
const listViewItemRef = ref<HTMLElement>();

const getListViewItemClass = computed(() => {
  const { isVirtualized } = props;
  return ["t-listView-item", isVirtualized && "t-listView-item-inner"];
});
const getListViewItemStyle = computed((): StyleValue => {
  return {
    top: `${props.top}px`,
    zIndex: props.zIndex,
    width: `${listViewItemRef.value?.scrollWidth}px`,
    height: `${props.height}px`
  };
});
</script>
<style lang="scss" scoped>
@import "./listView-item.scss";
</style>
