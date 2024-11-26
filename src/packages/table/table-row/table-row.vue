<template>
  <component
    :class="getRowClass"
    :style="getRowStyle"
    ref="tableRowRef"
    :is="props._virtualConfig?.isVirtualized ? 'div' : TListViewItem"
    @mouseenter.capture="handlerMouseEnter(true)"
    @mouseout.capture="handlerMouseOut(false)"
  >
    <TTableCol v-for="(col, index) in groupContext.columns" :key="col.prop" :col="col" :colIndex="index" />
  </component>
</template>
<script lang="ts" setup>
import { computed, inject, provide, ref, StyleValue } from "vue";
import { tableRowGroupKey, tableGroupKey, type GroupContextTableRowType, type GroupContextType } from "../constants";
import { PropsType } from "./table-row";
import { TListViewItem } from "../../listView";
import TTableCol from "../table-col/table-col.vue";
import { reactive } from "vue";
import { isBoolean } from "@/utils/is";
defineOptions({ name: "TTableRow" });
const groupContext = inject<GroupContextType | undefined>(tableGroupKey, void 0);
const props = withDefaults(defineProps<PropsType>(), {
  hoverBgColor: "#f5f7fa80",
  defBgColor: "#fff"
});
const tableRowRef = ref();
const state = reactive({
  isHover: false
});

/**
 * 处理鼠标浮动背景样式控制
 */
const handlerMouseEnter = (is: boolean) => {
  state.isHover = is;
};
const handlerMouseOut = (is: boolean) => {
  state.isHover = is;
};

/**
 * 动态样式
 */
const getRowStyle = computed((): StyleValue => {
  const { rowIndex, hoverBgColor, isHead, defBgColor } = props;
  const { stripe } = groupContext;
  let bgColor = defBgColor;
  // 表头样式固定
  if (isHead) return Object.assign({ backgroundColor: bgColor });
  // 设置斑马纹(默认取hover颜色)
  if (stripe && rowIndex % 2 === 0) bgColor = isBoolean(stripe) && stripe ? hoverBgColor : stripe.toString();
  return Object.assign(
    { backgroundColor: state.isHover ? hoverBgColor : bgColor },
    groupContext.rowStyle ? groupContext.rowStyle(props.row) : {}
  );
});
const getRowClass = computed(() => {
  return ["t-table-row", props.isHead && "t-table-row-head"];
});

// 抛出操作api，与子组件交互
provide<GroupContextTableRowType>(tableRowGroupKey, props);
</script>
<style lang="scss" scoped>
@import "./table-row.scss";
</style>
