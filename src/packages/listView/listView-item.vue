<template>
  <li :class="getListViewItemClass" :style="getListViewItemStyle">
    <slot />
  </li>
</template>
<script lang="ts" setup>
import type { PropsType } from "./listView-item";
import { computed, StyleValue } from "vue";
defineOptions({ name: "TListViewItem" });
const props = withDefaults(defineProps<PropsType>(), {
  isVirtualized: false,
  disabled: false
});
const getListViewItemClass = computed(() => {
  const { isVirtualized } = props;
  return ["t-listView-item", isVirtualized && "t-listView-item-inner", "t-listView-item-animation"];
});
const getListViewItemStyle = computed((): StyleValue => {
  return {
    top: `${props.top}px`
  };
});
</script>
<style lang="scss" scoped>
@import "./listView-item.scss";
</style>
