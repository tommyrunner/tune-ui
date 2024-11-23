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
  >
    <template #default="scope: ListSlotParamsType">
      <!-- 虚拟列表 -->
      <TTableRow
        v-if="props.isVirtualized"
        :row="scope.row"
        :rowIndex="scope.index"
        :isHead="scope.row._Head"
        :columns="props?.columns"
        :is-hover-bg="!scope.row._Head"
        :def-bg-color="scope.row._Head && headBgColor"
        :_virtual-config="{ isVirtualized: props.isVirtualized }"
      ></TTableRow>
      <!-- 插槽列表 -->
      <template v-else-if="slot.default">
        <!-- 默认表头 -->
        <TTableRow
          v-if="props.isDefSlotListHead"
          :rowIndex="0"
          :row="getData[0]"
          :isHead="true"
          :is-hover-bg="false"
          :def-bg-color="headBgColor"
        ></TTableRow>
        <slot />
      </template>
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
import { computed, provide, reactive, ref, StyleValue, useSlots } from "vue";
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
const slot = useSlots();
const tTableRef = ref();
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
  props.columns.forEach(col => {
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
/**
 * 适配并更新列宽度
 */
const autoColWidth = (prop: string) => {
  const findCol = props.columns.find(c => c.prop === prop);
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
    autoColWidth
  })
);
defineExpose({
  autoColWidth
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
