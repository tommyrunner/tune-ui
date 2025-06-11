<template>
  <li :class="getListViewItemClass" :style="getListViewItemStyle" ref="listViewItemRef">
    <slot />
  </li>
</template>

<script lang="ts" setup>
import "./list-view-item.scss";
import type { StyleValue } from "vue";
import type { PropsType } from "./list-view-item";
import type { GroupContextType } from "./constants";
import { computed, inject, ref } from "vue";
import { fromCssVal } from "@/utils";
import { listViewGroupKey } from "./constants";

/**
 * @description 列表项组件
 */
defineOptions({ name: "TListViewItem" });

/**
 * @description 从父组件注入上下文数据
 */
const groupContext = inject<GroupContextType | undefined>(listViewGroupKey, void 0);

/**
 * @description 组件Props定义
 */
const props = withDefaults(defineProps<PropsType>(), {});

/** 列表项DOM引用 */
const listViewItemRef = ref<HTMLElement>();

/**
 * 计算列表项类名
 * @returns {string[]} 类名数组
 */
const getListViewItemClass = computed((): string[] => {
  const { fixed } = props;
  return ["t-listView-item", groupContext?.isVirtualized && "t-listView-item-inner", fixed && "t-listView-item-fixed"];
});

/**
 * 计算列表项样式
 * @returns {StyleValue} 样式对象
 */
const getListViewItemStyle = computed((): StyleValue => {
  const { height, top } = props;
  return {
    // width: `${listViewItemRef.value?.scrollWidth}px`,
    height: fromCssVal(height ?? groupContext?.itemHeight),
    top: `${top}px`
  };
});
</script>
