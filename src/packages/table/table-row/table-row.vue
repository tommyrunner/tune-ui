<template>
  <TListViewItem
    :class="getRowClass"
    :style="getRowStyle"
    :fixed="props.rowIndex === groupContext.fixedIndexRow"
    v-bind="props.listItemBind"
    ref="tableRowRef"
    @click="handlerClick"
    @mouseenter.capture="handlerMouseEnter(true)"
    @mouseout.capture="handlerMouseOut(false)"
  >
    <TTableCol v-for="(col, index) in groupContext.columns" :key="col.prop" :col="col" :colIndex="index" />
  </TListViewItem>
</template>
<script lang="ts" setup>
import { computed, inject, provide, ref, StyleValue, toRefs } from "vue";
import { tableRowGroupKey, tableGroupKey, type GroupContextTableRowType, type GroupContextType } from "../constants";
import { EmitsType, PropsType } from "./table-row";
import TTableCol from "../table-col/table-col.vue";
import { reactive } from "vue";
import { isBoolean } from "@/utils/is";
import TListViewItem from "@/packages/listView/listView-item.vue";
defineOptions({ name: "TTableRow" });
// 共享数据
const groupContext = inject<GroupContextType | undefined>(tableGroupKey, void 0);
const props = withDefaults(defineProps<PropsType>(), {
  hoverBgColor: "#f5f7fa",
  defBgColor: "#fff"
});
const emit = defineEmits<EmitsType>();
const tableRowRef = ref();
const state = reactive({
  isHover: false
});

/**
 * 处理鼠标浮动背景样式控制
 */
const handlerMouseEnter = (is: boolean) => {
  state.isHover = is;
};
const handlerMouseOut = (is: boolean) => {
  state.isHover = is;
};
/**
 * 处理change事件
 */
const handlerClick = () => {
  emit("clickRow", props.row);
};

/**
 * 动态样式
 */
const getRowStyle = computed((): StyleValue => {
  const { rowIndex, hoverBgColor, isHead, isFoot, defBgColor, row } = props;
  const { stripe, fixedIndexRow, isVirtualized, rowStyle } = groupContext;
  let bgColor = defBgColor;
  const isFixedRow = rowIndex === fixedIndexRow;
  // 表头样式固定
  if (isHead || isFoot) return Object.assign({ backgroundColor: hoverBgColor });
  // 设置斑马纹(默认取hover颜色)
  if (stripe && rowIndex % 2 === 0) bgColor = isBoolean(stripe) && stripe ? hoverBgColor : stripe.toString();
  return Object.assign(
    {
      // row[groupContext.changeKey] 是否选中
      backgroundColor: state.isHover || row[groupContext.changeKey] ? hoverBgColor : bgColor,
      // 固定行样式(虚拟列表不支持)
      border: !isFixedRow || isVirtualized ? "auto" : `1px dashed ${groupContext.fixedRowBgColor}`
    },
    rowStyle ? rowStyle(props.row, isFixedRow) : {}
  );
});
const getRowClass = computed(() => {
  const { isHead, isFoot } = props;
  return ["_table-row", isHead && "_table-row-head", isFoot && "_table-row-foot"];
});

provide<GroupContextTableRowType>(
  tableRowGroupKey,
  reactive({
    ...toRefs(props)
  })
);
</script>
<style lang="scss" scoped>
@import "./table-row.scss";
</style>
