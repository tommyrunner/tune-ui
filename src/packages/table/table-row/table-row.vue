<template>
  <component
    :class="getRowClass"
    :style="getRowStyle"
    ref="tableRowRef"
    :is="props._virtualConfig?.isVirtualized ? 'div' : TListViewItem"
    @mouseenter.capture="handlerMouseEnter"
    @mouseout.capture="handlerMouseOut"
  >
    <TTableCol v-for="(col, index) in groupContext.columns" :key="col.prop" :col="col" :colIndex="index" />
  </component>
</template>
<script lang="ts" setup>
import { computed, inject, provide, ref } from "vue";
import { tableRowGroupKey, tableGroupKey, type GroupContextTableRowType, type GroupContextType } from "../constants";
import { PropsType } from "./table-row";
import { TListViewItem } from "../../listView";
import TTableCol from "../table-col/table-col.vue";
import { reactive } from "vue";
import { isBoolean } from "@/utils/is";
defineOptions({ name: "TTableRow" });
const groupContext = inject<GroupContextType | undefined>(tableGroupKey, void 0);
const props = withDefaults(defineProps<PropsType>(), {
  hoverBgColor: "#f9fafc",
  defBgColor: "#fff",
  isHoverBg: true
});
const tableRowRef = ref();
const state = reactive({
  rowBgColor: props.defBgColor
});

/**
 * 处理鼠标浮动背景样式控制
 */
const handlerMouseEnter = () => {
  if (props.isHoverBg) state.rowBgColor = props.hoverBgColor;
};
const handlerMouseOut = () => {
  state.rowBgColor = props.defBgColor;
};

/**
 * 动态样式
 */
const getRowStyle = computed(() => {
  const { rowIndex, hoverBgColor } = props;
  const { stripe } = groupContext;
  let bgColor = state.rowBgColor;
  // 设置斑马纹
  console.log(stripe);
  if (stripe && (rowIndex + 1) % 2 === 0) bgColor = isBoolean(stripe) && stripe ? hoverBgColor : stripe.toString();
  return {
    backgroundColor: bgColor
  };
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
