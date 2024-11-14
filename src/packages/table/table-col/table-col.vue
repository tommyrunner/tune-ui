<template>
  <div :class="getColClass" :style="getColStyle" :id="colTag">
    <span class="_cell">
      <!-- 表头自定义 -->
      <component v-if="col.renderHead && tableRowGroupContext.isHead" :is="col.renderHead(renderParams())" />
      <!-- 单元格自定义 -->
      <component v-else-if="col.render && !tableRowGroupContext.isHead" :is="col.render(renderParams())" />
      <!-- 默认渲染 -->
      <span v-else>{{ tableRowGroupContext.row[col.prop] }}</span>
    </span>
    <!-- 控制列宽 -->
    <div class="_cell-width-set" v-if="tableRowGroupContext.isHead" @dblclick="handlerColDbClick"></div>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, StyleValue } from "vue";
import { tableRowGroupKey, tableGroupKey, GroupContextType, GroupContextTableRowType, tableColTag } from "../constants";
import { PropsType } from "./table-col";
import { SearchRenderScope } from "../table";
defineOptions({ name: "TTableCol" });
const props = withDefaults(defineProps<PropsType>(), {});
const colTag = `${tableColTag}-${props.col.prop}`;
const groupContext = inject<GroupContextType | undefined>(tableGroupKey, void 0);
const tableRowGroupContext = inject<GroupContextTableRowType | undefined>(tableRowGroupKey, void 0);
/**
 * 双击处理适配宽度
 */
const handlerColDbClick = () => {
  const { isHead } = tableRowGroupContext;
  const { dbClickAutoWidth } = groupContext;
  const { col } = props;
  let maxWidth = 0;
  if (isHead && col.prop && dbClickAutoWidth) {
    // 获取当前prop的el元素
    const cells = groupContext.tTableRef.$el.querySelectorAll(`#${colTag} ._cell`) as HTMLElement[];
    // 得出最大宽度
    cells.forEach(cell => {
      if (cell.offsetWidth > maxWidth) {
        maxWidth = cell.offsetWidth;
      }
    });
    console.log("maxWidth", maxWidth);
    // 适配最大宽度
    col.width = maxWidth;
  }
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
  const { border } = groupContext;
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
    flex: col.width ? "none" : `1`,
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
