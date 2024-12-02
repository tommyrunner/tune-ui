<template>
  <!-- 单元格 -->
  <div :class="getColClass" :style="getColStyle" :id="getTableColTag(col.prop)">
    <span :class="getCellClass" @click="handleSort">
      <!-- 表头自定义 -->
      <component v-if="rowGroupContext?.isHead && col.renderHead" :is="col.renderHead(renderParams())" />
      <!-- 单元格自定义 -->
      <component v-if="!rowGroupContext?.isHead && col.render" :is="col.render(renderParams())" />
      <!-- 默认渲染 -->
      <span v-if="!col.renderHead">{{ rowGroupContext?.row[col.prop] }}</span>
      <!-- 头部功能 -->
      <div class="_head-fun" v-if="rowGroupContext?.isHead && col.sortable">
        <div class="_sort">
          <TIcon icon="caret-up" :size="12" :class="state.sort === 'asc' ? '_icon-active' : ''" />
          <TIcon icon="caret-down" :size="12" :class="state.sort === 'desc' ? '_icon-active' : ''" />
        </div>
      </div>
    </span>
    <!-- 控制列宽 -->
    <div class="_cell-width-line" v-if="rowGroupContext.isHead && !col._group" @dblclick="handlerColDbClick"></div>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, reactive, StyleValue } from "vue";
import {
  type GroupContextType,
  type GroupContextTableRowType,
  type GroupContextTableColType,
  tableRowGroupKey,
  tableGroupKey,
  tableColGroupKey,
  getTableColTag
} from "../../constants";
import { PropsType } from "./col-cell";
import { SearchRenderScope, type StateSortType } from "../../table";
import { TIcon } from "../../../icon";
defineOptions({ name: "TTableColCell" });
const props = withDefaults(defineProps<PropsType>(), {});
const groupContext = inject<GroupContextType | undefined>(tableGroupKey, void 0);
const rowGroupContext = inject<GroupContextTableRowType | undefined>(tableRowGroupKey, void 0);
const colGroupContext = inject<GroupContextTableColType | undefined>(tableColGroupKey, void 0);

const state = reactive({
  sort: "none" as StateSortType["sort"]
});

/**
 * 双击处理适配宽度
 */
const handlerColDbClick = () => {
  const { isHead } = rowGroupContext;
  const { autoColWidth } = groupContext;
  const { col } = props;
  if (col.prop && isHead) autoColWidth(col.prop);
};
/**
 * 处理排序
 */
const handleSort = () => {
  const { col } = props;
  if (!col.sortable) return;
  // 获取当前列对应的排序配置在总的排序配置数组中的索引（假设props中col有唯一标识属性用于查找）
  const colIndex = groupContext.state.sortColProps.findIndex(col => col.prop === col.prop);
  if (colIndex === -1) {
    // 如果当前列的排序配置不存在，添加一个默认升序的排序配置
    groupContext.state.sortColProps.push({ sort: "asc", prop: col.prop });
    state.sort = "asc";
  } else {
    const findSortCol = groupContext.state.sortColProps[colIndex];
    if (findSortCol.sort === "none") {
      findSortCol.sort = "asc";
    } else if (findSortCol.sort === "asc") {
      findSortCol.sort = "desc";
    } else {
      findSortCol.sort = "none";
    }
    state.sort = findSortCol.sort;
  }
};
/**
 * 渲染单元格内容
 * @param index 单元格下标
 * @param col 单元格配置
 */
const renderParams = (): SearchRenderScope => {
  const { col } = props;
  const { rowIndex, row } = rowGroupContext;
  const { colIndex } = colGroupContext;
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
  const { state } = groupContext;
  let fixedStyle: StyleValue = {};
  if (col.fixed) {
    fixedStyle = {
      [col.fixed]: `${col._fixedValue || 0}px`
    };
    if (state.isFixedRight && col.fixed === "right" && col._fixedLast) {
      fixedStyle["boxShadow"] = "-5px 0px 3px 0px rgba(0, 0, 0, 0.05)";
    }
    if (state.isFixedLeft && col.fixed === "left" && col._fixedLast) {
      fixedStyle["boxShadow"] = "5px 0px 3px 0px rgba(0, 0, 0, 0.05)";
    }
  }
  return {
    // 单独设置宽度
    flex: col.width ? "none" : `1 0`,
    width: `${col.width}px !important`,
    ...fixedStyle,
    ...borderStyle
  };
});
const getColClass = computed(() => {
  const { col } = props;
  return ["_col-cell", col.fixed && "_col-fixed"];
});
const getCellClass = computed(() => {
  const { col } = props;
  return ["_cell", col.sortable && "_cell-pointer"];
});
</script>
<style lang="scss" scoped>
@import "./col-cell.scss";
</style>
