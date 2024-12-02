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
    @update-view="handlerUpdateView"
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
        @change="(params: any) => emit('change', params)"
      ></TTableRow>
      <!-- json列表 -->
      <template v-else>
        <TTableRow
          v-for="(row, index) in getData"
          :key="index"
          :rowIndex="index"
          :row="row"
          :isHead="row._Head"
          :is-hover-bg="!row._Head"
          :def-bg-color="row._Head && headBgColor"
          @change="(params: any) => emit('change', params)"
        ></TTableRow>
      </template>
    </template>
  </TListView>
</template>
<script lang="ts" setup>
import type { EmitsType, PropsType, TableColumnsType } from "./table";
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
  changeRow: "none",
  columns: () => [],
  data: () => []
});
const emit = defineEmits<EmitsType>();
const tTableRef = ref<InstanceType<typeof TListView>>();
const testRef = ref();
const state = reactive({
  // 是否浮动列
  isFixedLeft: false,
  isFixedRight: true,
  // 记录选择行
  changeRows: [] as any[],
  // 排序字段
  sortColProps: []
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
  // 通过模拟数据初始化表头数据
  initHeadData(filterColumns.value, head);
  const temData = [...props.data];
  // 排序
  temData.sort((a, b) => {
    // 自定义排序
    if (props.sortMethod) return props.sortMethod({ a, b }, state.sortColProps);
    // 默认排序
    for (const config of state.sortColProps) {
      const { sort, prop } = config;
      const valA = a[prop];
      const valB = b[prop];
      if (sort === "asc") {
        return valA - valB;
      } else if (sort === "desc") {
        return valB - valA;
      }
    }
    return 0;
  });
  return [head, ...temData];
});
/**
 * 平铺并初始化表头
 * @param columns 列配置
 * @param head 初始化表头数据
 */
const initHeadData = (columns: TableColumnsType[], head: any) => {
  columns.forEach(col => {
    head[col.prop] = col.label;
    if (col.children && col.children.length) {
      col._group = true;
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

const filterColumns = computed((): TableColumnsType[] => {
  const columnsCopy = {
    left: [] as TableColumnsType[],
    right: [] as TableColumnsType[],
    cols: [] as TableColumnsType[]
  };
  // 悬浮字段默认靠边
  props.columns.forEach(col => {
    if (col.fixed === "left") {
      columnsCopy.left.push(col);
    } else if (col.fixed === "right") {
      columnsCopy.right.push(col);
    } else columnsCopy.cols.push(col);
  });
  // 设置边缘标记
  if (columnsCopy.left.length) columnsCopy.left[columnsCopy.left.length - 1]._fixedLast = true;
  if (columnsCopy.right.length) columnsCopy.right[0]._fixedLast = true;
  return [...columnsCopy.left, ...columnsCopy.cols, ...columnsCopy.right].sort((a, b) => {
    return (a.sort || 0) - (b.sort || 0);
  });
});
const handlerUpdateView = (content: HTMLElement) => {
  autoFixedPosition(content);
};
/**
 * 滚动监听
 * @param content 滚动容器
 */
const handlerScroll = (content: HTMLElement) => {
  // 横向轴超出0视为可浮动列
  state.isFixedLeft = content.scrollLeft > 0;
  state.isFixedRight = content.offsetWidth + content.scrollLeft < content.scrollWidth;
  autoFixedPosition(content);
};
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
      col._fixedValue = fixedValues[fixedDirection];
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
