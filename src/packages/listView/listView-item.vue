<template>
  <li :class="getListViewItemClass" :style="getListViewItemStyle" ref="listViewItemRef">
    <slot />
  </li>
</template>
<script lang="ts" setup>
import { GroupContextType, listViewGroupKey } from "./constants";
import type { PropsType } from "./listView-item";
import { computed, inject, ref, StyleValue } from "vue";
defineOptions({ name: "TListViewItem" });
const groupContext = inject<GroupContextType | undefined>(listViewGroupKey, void 0);
const props = withDefaults(defineProps<PropsType>(), {});
const listViewItemRef = ref<HTMLElement>();

const getListViewItemClass = computed(() => {
  const { fixed } = props;
  return [
    "t-listView-item",
    groupContext?.isVirtualized && "t-listView-item-inner",
    fixed && !groupContext.isVirtualized && "t-listView-item-fixed"
  ];
});
const getListViewItemStyle = computed((): StyleValue => {
  const { height, top } = props;
  return {
    width: `${listViewItemRef.value?.scrollWidth}px`,
    height: `${height}px`,
    top: `${top}px`
  };
});
</script>
<style lang="scss" scoped>
@import "./listView-item.scss";
</style>
