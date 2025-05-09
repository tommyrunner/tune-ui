<template>
  <!-- 单元格 -->
  <div :class="getColClass" :style="getColStyle" :id="getTableColTag(col.prop)">
    <span :class="getCellClass" @click="handleSort">
      <!-- [数据过滤] -->
      <CellFilter :filters="col.filters" v-if="rowGroupContext?.isHead && col.filters" />
      <!-- [表头] -->
      <template v-if="rowGroupContext?.isHead">
        <!-- 自定义 -->
        <component v-if="col.renderHead" :is="col.renderHead(renderParams())" />
        <!-- 默认 -->
        <span v-else>{{ groupContext?.headData[col.prop] }}</span>
      </template>
      <!-- [单元格] -->
      <template v-else>
        <!-- 默认合计 -->
        <template v-if="rowGroupContext.isFoot">
          <span>{{ getSummary() }}</span>
        </template>
        <!-- 自定义 -->
        <component v-else-if="!rowGroupContext?.isHead && col.render" :is="col.render(renderParams())" />
        <!-- 默认 -->
        <span v-else>{{ rowGroupContext?.row[col.prop] }}</span>
      </template>
      <!-- [排序功能] -->
      <CellSort v-if="rowGroupContext?.isHead && col.sortable" :sort="state.sort" />
    </span>
    <!-- 控制列宽 -->
    <div class="_cell-width-line" v-if="rowGroupContext.isHead && !col[TABLE_COL_GROUP]" @dblclick="handlerDbCol"></div>
  </div>
</template>
<script lang="ts" setup>
import "./col-cell.scss";
import type { ColumnRenderScope, StateSortType } from "@/packages/table/table";
import type { PropsType } from "./col-cell";
import {
  type GroupContextType,
  type GroupContextTableRowType,
  type GroupContextTableColType,
  tableRowGroupKey,
  tableGroupKey,
  tableColGroupKey,
  getTableColTag,
  TABLE_COL_GROUP,
  TABLE_COL_FIXED_LAST,
  TABLE_COL_FIXED_VALUE
} from "@/packages/table/constants";
import { computed, inject, reactive, StyleValue } from "vue";
import CellFilter from "./cell-filter/cell-filter.vue";
import CellSort from "./cell-sort/cell-sort.vue";
import { dataSummary } from "@/utils";
import { isBoolean } from "@/utils/is";

defineOptions({ name: "TTableColCell" });
const props = withDefaults(defineProps<PropsType>(), {});
// 共享状态值
const groupContext = inject<GroupContextType | undefined>(tableGroupKey, void 0);
const rowGroupContext = inject<GroupContextTableRowType | undefined>(tableRowGroupKey, void 0);
const colGroupContext = inject<GroupContextTableColType | undefined>(tableColGroupKey, void 0);
const state = reactive({
  sort: "none" as StateSortType["sort"]
});
/**
 * 双击处理适配宽度
 */
const handlerDbCol = () => {
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
const renderParams = (): ColumnRenderScope => {
  const { col } = props;
  const { rowIndex, row = {} } = rowGroupContext;
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
 * 计算合计值
 */
const getSummary = () => {
  try {
    const { col } = props;
    const { summary } = groupContext;
    // 默认排序
    if (isBoolean(summary)) {
      return dataSummary(groupContext?.data, col.prop);
    } else {
      // 自定义
      return summary(dataSummary(groupContext?.data, col.prop), renderParams());
    }
  } catch {
    return "--";
  }
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
      [col.fixed]: `${col[TABLE_COL_FIXED_VALUE] || 0}px`
    };
    if (state.isFixedRight && col.fixed === "right" && col[TABLE_COL_FIXED_LAST]) {
      fixedStyle["boxShadow"] = "-5px 0px 3px 0px rgba(0, 0, 0, 0.05)";
    }
    if (state.isFixedLeft && col.fixed === "left" && col[TABLE_COL_FIXED_LAST]) {
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
