<template>
  <div :class="getRowClass">
    <div class="_table-col" v-for="(col, index) in groupContext?.columns" :key="col.prop" :style="getColStyle(col)">
      <!-- 表头自定义 -->
      <component v-if="col.renderHead && props.isHead" :is="col.renderHead(renderParams(index, col))" />
      <!-- 单元格自定义 -->
      <component v-else-if="col.render && !props.isHead" :is="col.render(renderParams(index, col))" />
      <!-- 默认渲染 -->
      <span v-else>{{ props.row[col.prop] }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, StyleValue } from "vue";
import { tableGroupKey, GroupContextType } from "./constants";
import { PropsType } from "./table-row";
import { TableColumnsType, SearchRenderScope } from "./table";
defineOptions({ name: "TTableRow" });
const props = withDefaults(defineProps<PropsType>(), {});
const groupContext = inject<GroupContextType | undefined>(tableGroupKey, void 0);
const getRowClass = computed(() => {
  return ["t-table-row", props.isHead && "t-table-row-head"];
});
const getColStyle = computed(() => {
  return (col: TableColumnsType): StyleValue => {
    return {
      width: `${col.width}px`
    };
  };
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
</script>
<style lang="scss" scoped>
@import "./table-row.scss";
</style>
