<template>
  <component
    :class="getRowClass"
    :style="getRowStyle"
    :is="props._virtualConfig?.isVirtualized ? 'div' : TListViewItem"
    @mouseenter.capture="handlerMouseEnter"
    @mouseout.capture="handlerMouseOut"
  >
    <div class="_table-col" v-for="(col, index) in getColumns" :key="col.prop" :style="getColStyle(col)">
      <!-- 表头自定义 -->
      <component v-if="col.renderHead && props.isHead" :is="col.renderHead(renderParams(index, col))" />
      <!-- 单元格自定义 -->
      <component v-else-if="col.render && !props.isHead" :is="col.render(renderParams(index, col))" />
      <!-- 默认渲染 -->
      <span v-else>{{ props.row[col.prop] }}</span>
    </div>
  </component>
</template>
<script lang="ts" setup>
import { computed, inject, StyleValue } from "vue";
import { tableGroupKey, GroupContextType } from "./constants";
import { PropsType } from "./table-row";
import { TableColumnsType, SearchRenderScope } from "./table";
import { TListViewItem } from "../listView";
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
const handlerMouseEnter = () => {
  if (props.isHoverBg) state.rowBgColor = props.hoverBgColor;
};
const handlerMouseOut = () => {
  state.rowBgColor = props.defBgColor;
};
const getRowClass = computed(() => {
  return ["t-table-row", props.isHead && "t-table-row-head"];
});
const getColumns = computed(() => {
  return props.columns || groupContext?.columns;
});
const renderParams = (index: number, col: TableColumnsType): SearchRenderScope => {
  const { rowIndex, row } = props;
  return {
    rowIndex: rowIndex,
    colIndex: index,
    columns: groupContext?.columns,
    value: row[col.prop],
    rowCol: col,
    data: row
  };
};
const getColStyle = computed(() => {
  return (col: TableColumnsType): StyleValue => {
    return {
      // 单独设置宽度
      flex: col.width ? "none" : 1,
      width: `${col.width}px !important`
    };
  };
});
const getRowStyle = computed(() => {
  return {
    backgroundColor: state.rowBgColor
  };
});
</script>
<style lang="scss" scoped>
@import "./table-row.scss";
</style>
