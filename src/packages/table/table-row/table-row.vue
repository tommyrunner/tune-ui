<template>
  <component
    :class="getRowClass"
    :style="getRowStyle"
    :is="props._virtualConfig?.isVirtualized ? 'div' : TListViewItem"
    @mouseenter.capture="handlerMouseEnter"
    @mouseout.capture="handlerMouseOut"
  >
    <TTableCol v-for="(col, index) in getColumns" :key="col.prop" :col="col" :colIndex="index" :columns="getColumns" />
  </component>
</template>
<script lang="ts" setup>
import { computed, inject, provide } from "vue";
import { tableGroupKey, tableRowGroupKey, GroupContextType, GroupContextTableRowType } from "../constants";
import { PropsType } from "./table-row";
import { TListViewItem } from "../../listView";
import TTableCol from "../table-col/table-col.vue";
import { reactive } from "vue";
defineOptions({ name: "TTableRow" });
const props = withDefaults(defineProps<PropsType>(), {
  hoverBgColor: "#f5f7fa",
  defBgColor: "#fff",
  isHoverBg: true
});
const groupContext = inject<GroupContextType | undefined>(tableGroupKey, void 0);
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
 * 获取当前row的配置项,并居然虚拟列表
 */
const getColumns = computed(() => {
  return props.columns || groupContext?.columns;
});
/**
 * 动态样式
 */
const getRowStyle = computed(() => {
  const { rowIndex } = props;
  const { stripe } = groupContext;
  let bgColor = state.rowBgColor;
  // 设置斑马纹
  if (stripe && rowIndex % 2 === 0) bgColor = stripe;
  return {
    backgroundColor: bgColor
  };
});
const getRowClass = computed(() => {
  return ["t-table-row", props.isHead && "t-table-row-head"];
});

// 抛出操作api，与子组件交互
provide<GroupContextTableRowType>(
  tableRowGroupKey,
  reactive({
    ...props,
    columns: getColumns.value
  })
);
</script>
<style lang="scss" scoped>
@import "./table-row.scss";
</style>
