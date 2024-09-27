<template>
  <div :class="getGroupClass" :style="getGroupStyle">
    <TListView v-bind="getBind">
      <template #default="scope: ListSlotParamsType">
        <!-- 虚拟列表 -->
        <TTableRow v-if="props.isVirtualized" :row="scope.row" :rowIndex="scope.index"></TTableRow>
        <!-- 正常列表 -->
        <template v-else>
          <!-- 表头 -->
          <TTableRow v-for="(row, index) in getData" :key="index" :rowIndex="index" :row="row" :isHead="row._Head"></TTableRow>
        </template>
      </template>
    </TListView>
  </div>
</template>
<script lang="ts" setup>
import type { PropsType, TableColumnsType } from "./table";
import type { PropsType as ListPropsType, ListSlotParamsType } from "../listView/listView";
import { computed, provide, reactive, StyleValue } from "vue";
import { TListView } from "../listView/index";
import TTableRow from "./table-row.vue";
import { type GroupContextType, tableGroupKey } from "./constants";
defineOptions({ name: "TTable" });
const props = withDefaults(defineProps<PropsType>(), {
  columns: () => []
});
const getBind = computed(() => {
  const binds: ListPropsType = {};
  if (props.isVirtualized) {
    binds.isVirtualized = true;
    binds.listData = props.data;
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
const getGroupClass = computed(() => {
  return ["t-table"];
});
const getGroupStyle = computed((): StyleValue => {
  const { height } = props;
  return {
    height: `${height}px`
  };
});
// 抛出操作api，与子组件交互
provide<GroupContextType>(
  tableGroupKey,
  reactive({
    columns: props.columns
  })
);
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
