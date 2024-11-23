<template>
  <div :class="getColClass" :style="getColStyle" :id="getTableColTag(col.prop)">
    <span class="_cell">
      <!-- 表头自定义 -->
      <component v-if="tableRowGroupContext?.isHead && col.renderHead" :is="col.renderHead(renderParams())" />
      <!-- 单元格自定义 -->
      <component v-if="!tableRowGroupContext?.isHead && col.render" :is="col.render(renderParams())" />
      <!-- 默认渲染 -->
      <span v-if="!col.renderHead">{{ tableRowGroupContext?.row[col.prop] }}</span>
    </span>
    <!-- 控制列宽 -->
    <div class="_cell-width-set" v-if="tableRowGroupContext.isHead" @dblclick="handlerColDbClick"></div>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, StyleValue } from "vue";
import { tableRowGroupKey, tableGroupKey, GroupContextType, GroupContextTableRowType, getTableColTag } from "../constants";
import { PropsType } from "./table-col";
import { SearchRenderScope } from "../table";
defineOptions({ name: "TTableCol" });
const props = withDefaults(defineProps<PropsType>(), {});
const groupContext = inject<GroupContextType | undefined>(tableGroupKey, void 0);
const tableRowGroupContext = inject<GroupContextTableRowType | undefined>(tableRowGroupKey, void 0);
/**
 * 双击处理适配宽度
 */
const handlerColDbClick = () => {
  const { isHead } = tableRowGroupContext;
  const { autoColWidth } = groupContext;
  const { col } = props;
  if (col.prop && isHead) autoColWidth(col.prop);
};
/**
 * 渲染单元格内容
 * @param index 单元格下标
 * @param col 单元格配置
 */
const renderParams = (): SearchRenderScope => {
  const { col, colIndex } = props;
  const { rowIndex, row } = tableRowGroupContext;
  return {
    rowIndex: rowIndex,
    colIndex: colIndex,
    columns: groupContext?.columns,
    value: row[col.prop],
    rowCol: col,
    data: row
  };
};
/**
 * 动态样式
 */
const getColStyle = computed(() => {
  // 配置表格边框
  const border = groupContext?.border;
  const { col } = props;
  let borderStyle: StyleValue = {};
  if (border) {
    borderStyle = {
      borderLeft: `1px solid ${border}`,
      borderBottom: `1px solid ${border}`
    };
  }
  return {
    // 单独设置宽度
    flex: col.width ? "none" : `1 0`,
    width: `${col.width}px !important`,
    ...borderStyle
  };
});
const getColClass = computed(() => {
  const { isHead } = tableRowGroupContext;
  return ["_table-col", isHead && "_table-col-head"];
});
</script>
<style lang="scss" scoped>
@import "./table-col.scss";
</style>
