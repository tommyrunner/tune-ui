<template>
  <TListView
    class="t-table"
    ref="tTableRef"
    v-bind="getBind"
    :style="getTableStyle"
    :height="props.height"
    :virtualConfig="{
      fixedTopValue: 0,
      fixedIndex: 0,
      itemHeight: virtualizedItemHeight
    }"
    @scroll="handlerScroll"
  >
    <template #default="scope: ListSlotParamsType">
      <!-- 虚拟列表 -->
      <TTableRow
        ref="testRef"
        v-if="props.isVirtualized"
        :row="scope.row"
        :rowIndex="scope.index"
        :isHead="scope.row._Head"
        :is-hover-bg="!scope.row._Head"
        :def-bg-color="scope.row._Head && headBgColor"
        :_virtual-config="{ isVirtualized: props.isVirtualized }"
      ></TTableRow>
      <!-- json列表 -->
      <template v-else>
        <!-- 表头 -->
        <TTableRow
          v-for="(row, index) in getData"
          :key="index"
          :rowIndex="index"
          :row="row"
          :isHead="row._Head"
          :is-hover-bg="!row._Head"
          :def-bg-color="row._Head && headBgColor"
        ></TTableRow>
      </template>
    </template>
  </TListView>
</template>
<script lang="ts" setup>
import type { PropsType, TableColumnsType } from "./table";
import type { PropsType as ListPropsType, ListSlotParamsType } from "../listView/listView";
import { computed, provide, reactive, ref, StyleValue } from "vue";
import { TListView } from "../listView/index";
import TTableRow from "./table-row/table-row.vue";
import { getTableColTag, type GroupContextType, tableGroupKey } from "./constants";
defineOptions({ name: "TTable" });
const props = withDefaults(defineProps<PropsType>(), {
  headBgColor: "#f5f7fa",
  border: "#dcdcdc68",
  isDefSlotListHead: true,
  dbClickAutoWidth: true,
  virtualizedItemHeight: 36,
  columns: () => [],
  data: () => []
});
const tTableRef = ref<InstanceType<typeof TListView>>();
const testRef = ref();
const state = reactive({
  // 是否浮动列
  isFixedLeft: false,
  isFixedRight: true
});
const getBind = computed(() => {
  const binds: ListPropsType = {};
  if (props.isVirtualized) {
    binds.isVirtualized = true;
    binds.listData = getData.value;
  }
  return binds;
});
const getData = computed((): TableColumnsType[] => {
  // 处理请求头
  let head = { _Head: true };
  filterColumns.value.forEach(col => {
    head[col.prop] = col.label;
  });
  return [head, ...props.data];
});
const getTableStyle = computed((): StyleValue => {
  const { border } = props;
  return {
    borderTop: `1px solid ${border}`,
    borderBottom: `1px solid ${border}`,
    borderRight: `1px solid ${border}`
  };
});

const filterColumns = computed((): TableColumnsType[] => {
  const columnsCopy = [...props.columns];
  // 悬浮字段默认靠边
  columnsCopy.forEach(col => {
    if (col.fixed === "left") {
      col.sort = Number.MAX_VALUE * -1;
    } else if (col.fixed === "right") {
      col.sort = Number.MAX_VALUE;
    }
  });
  return columnsCopy.sort((a, b) => {
    return (a.sort || 0) - (b.sort || 0);
  });
});
/**
 * 滚动监听
 * @param content 滚动容器
 */
const handlerScroll = (content: HTMLElement) => {
  // 横向轴超出0视为可浮动列
  state.isFixedLeft = content.scrollLeft > 0;
  state.isFixedRight = content.offsetWidth + content.scrollLeft < content.scrollWidth;
  // 多个浮动字段时,需要动态设置浮动值
  // 临时标记浮动值
  let temFixedValue = {
    left: 0,
    right: 0
  };
  filterColumns.value.forEach(col => {
    if (col.fixed) {
      const colEl = content.querySelector(`#${getTableColTag(col.prop)}`) as HTMLElement;
      col._fixedValue = temFixedValue[col.fixed];
      if (temFixedValue[col.fixed] === 0) temFixedValue[col.fixed] = colEl.offsetWidth;
      else temFixedValue[col.fixed] += colEl.offsetWidth;
    }
    console.log(temFixedValue);
  });
};
/**
 * 适配并更新列宽度
 */
const autoColWidth = (prop: string) => {
  const findCol = filterColumns.value.find(c => c.prop === prop);
  if (!findCol) return;
  let maxWidth = 0;
  // 获取当前prop的el元素
  const cells = tTableRef.value.$el.querySelectorAll(`#${getTableColTag(findCol.prop)} ._cell`) as HTMLElement[];
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
provide<GroupContextType>(
  tableGroupKey,
  reactive({
    ...props,
    autoColWidth,
    state,
    columns: filterColumns
  })
);
defineExpose({
  autoColWidth
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
