<template>
  <div class="t-table" ref="tTableRef" :style="getTableStyle">
    <!-- 列表数据 -->
    <TListView
      :list-data="listData"
      :is-virtualized="isVirtualized"
      :height="props.height"
      :item-height="props.isVirtualized ? virtualizedItemHeight : undefined"
      :item-fixed="props.fixedRow"
      @scroll="handleScroll"
      @update-view="handleUpdateView"
    >
      <!-- 表头 -->
      <template #head="scope">
        <component :is="renderTableRow({ ...scope, index: 0, row: headData }, true, false)" />
      </template>
      <!-- 虚拟列表 -->
      <template #default="scope: ListSlotParamsType">
        <component :is="renderTableRow(scope, false, false)" />
      </template>
      <!-- 合计 -->
      <template #foot="scope" v-if="props.summary">
        <component :is="renderTableRow({ ...scope, index: 0 }, false, true)" />
      </template>
    </TListView>
  </div>
</template>
<script lang="tsx" setup>
import type { EmitsType, PropsType, StateFilterType, TableColumnsType, TableRowType } from "./table";
import type { ListSlotParamsType } from "@/packages/listView/listView";
import { computed, provide, reactive, ref, StyleValue, toRefs } from "vue";
import { TListView } from "@/packages/listView";
import { getTableColTag, type GroupContextType, TABLE_COL_FIXED_VALUE, TABLE_COL_GROUP, tableGroupKey } from "./constants";
import { useTable } from "./hooks";
defineOptions({ name: "TTable" });
const props = withDefaults(defineProps<PropsType>(), {
  headBgColor: "#f5f7fa",
  border: "#dcdcdc68",
  isDefSlotListHead: true,
  dbClickAutoWidth: true,
  virtualizedItemHeight: 50,
  changeType: "none",
  changeKey: "_checked",
  columns: () => [],
  data: () => []
});
const emit = defineEmits<EmitsType>();
const tTableRef = ref<HTMLDivElement>();
const state = reactive({
  // 是否浮动列
  isFixedLeft: false,
  isFixedRight: true,
  // 是否悬浮行
  isFixedTop: false,
  // 排序字段
  sortColProps: []
});
const { filterColumns, renderTableRow } = useTable(props, emit);

/**
 * 处理头部数据
 */
const headData = computed(() => {
  // 处理请求头
  let head = {};
  initHeadData(filterColumns.value, head);
  return head;
});
/**
 * 处理表格数据
 */
const listData = computed((): TableColumnsType[] => {
  // 得出过滤条件
  let filterConditions = {} as { [key in string]: StateFilterType[] };
  props.columns.forEach(col => {
    if (col.filters && col.filters.length) {
      filterConditions[col.prop] = col.filters.filter(f => f.checked);
    }
  });
  const temData = filterDataByConditions([...props.data], filterConditions);
  // 排序
  temData.sort((rowA: TableRowType, rowB: TableRowType) => {
    // 自定义排序
    if (props.sortMethod) return props.sortMethod({ rowA, rowB }, state.sortColProps);
    // 默认排序
    for (const config of state.sortColProps) {
      const { sort, prop } = config;
      const valA = rowA[prop];
      const valB = rowB[prop];
      if (sort === "asc") {
        return valA - valB;
      } else if (sort === "desc") {
        return valB - valA;
      }
    }
    return 0;
  });
  // 过滤
  return temData;
});
// 根据过滤条件过滤temData的函数
function filterDataByConditions(data: TableRowType, conditions: { [key in string]: StateFilterType[] }) {
  return data.filter((item: TableRowType) => {
    for (const key in conditions) {
      const conditionArr = conditions[key];
      let isMatch = true;
      for (const condition of conditionArr) {
        const value = item[key];
        switch (condition.type) {
          case "gt":
            isMatch = isMatch && value > condition.value;
            break;
          case "lt":
            isMatch = isMatch && value < condition.value;
            break;
          case "eq":
            isMatch = isMatch && value === condition.value;
            break;
          // 可以根据实际需要扩展更多的比较类型逻辑，比如 "gte"（大于等于）、"lte"（小于等于）等
          default:
            break;
        }
        if (!isMatch) {
          break;
        }
      }
      if (!isMatch) {
        return false;
      }
    }
    return true;
  });
}

/**
 * 平铺并初始化表头
 * @param columns 列配置
 * @param head 初始化表头数据
 */
const initHeadData = (columns: TableColumnsType[], head: TableRowType) => {
  columns.forEach(col => {
    head[col.prop] = col.label;
    if (col.children && col.children.length) {
      col[TABLE_COL_GROUP] = true;
      initHeadData(col.children, head);
    }
  });
};
const getTableStyle = computed((): StyleValue => {
  const { border } = props;
  return {
    borderTop: `1px solid ${border}`,
    borderBottom: `1px solid ${border}`,
    borderRight: `1px solid ${border}`
  };
});
/**
 * 列表渲染初始化
 * @param content
 */
const handleUpdateView = (content: HTMLElement) => {
  autoFixedPosition(content);
};
/**
 * 滚动监听
 * @param content 滚动容器
 */
const handleScroll = (content: HTMLElement) => {
  autoFixedPosition(content);
};
/**
 * 固定列位置处理
 * @param columns 列配置
 * @param fixedDirection 浮动方向
 * @param content 滚动容器
 * @param fixedValues 浮动值
 */
const processFixedColumns = (
  columns: TableColumnsType[],
  fixedDirection: TableColumnsType["fixed"],
  content: HTMLElement,
  fixedValues: { [key in TableColumnsType["fixed"]]: number }
) => {
  if (!content) return;
  // 不同方向浮动位置取值不同
  const loopDirection = fixedDirection === "left" ? columns : columns.slice().reverse();
  // left顺排序,right反方向排序取值
  loopDirection.forEach(col => {
    if (col.fixed && col.fixed === fixedDirection) {
      const colEl = content.querySelector(`#${getTableColTag(col.prop)}`) as HTMLElement;
      if (!colEl) return;
      col[TABLE_COL_FIXED_VALUE] = fixedValues[fixedDirection];
      if (fixedValues[fixedDirection] === 0) {
        fixedValues[fixedDirection] = colEl.offsetWidth;
      } else {
        fixedValues[fixedDirection] += colEl.offsetWidth;
      }
    }
  });
};
/**
 * 多个浮动字段时,需要动态设置浮动值
 * @param content
 */
const autoFixedPosition = (content: HTMLElement) => {
  if (!content) return;
  // 横向轴超出0视为可浮动列
  state.isFixedLeft = content.scrollLeft > 0;
  state.isFixedRight = content.offsetWidth + content.scrollLeft < content.scrollWidth;
  state.isFixedTop = content.scrollTop > 0;
  // 用于存储左右方向固定列的宽度累计值，初始化为0
  const fixedWidthValues: { [key in TableColumnsType["fixed"]]: number } = {
    left: 0,
    right: 0
  };
  // 处理左侧固定列，累加宽度并设置对应列的宽度值属性
  processFixedColumns(filterColumns.value, "left", content, fixedWidthValues);
  // 处理右侧固定列，累加宽度并设置对应列的宽度值属性
  processFixedColumns(filterColumns.value, "right", content, fixedWidthValues);
};
/**
 * 适配并更新列宽度
 */
const autoColWidth = (prop: string) => {
  const findCol = filterColumns.value.find(c => c.prop === prop);
  if (!findCol) return;
  let maxWidth = 0;
  // 获取当前prop的el元素
  const cells = [...tTableRef.value.querySelectorAll(`#${getTableColTag(findCol.prop)} ._cell`)] as HTMLElement[];
  // 得出最大宽度
  cells.forEach(cell => {
    if (cell.offsetWidth > maxWidth) {
      maxWidth = cell.offsetWidth;
    }
  });
  // 适配最大宽度
  findCol.width = maxWidth;
};

// 抛出操作api，与子组件交互
provide<GroupContextType>(tableGroupKey, reactive({ ...toRefs(props), autoColWidth, state, columns: filterColumns, headData }));
/**
 * 抛出操作api
 */
defineExpose({
  autoColWidth
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
