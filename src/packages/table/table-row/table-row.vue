<template>
  <component
    :class="getRowClass"
    :style="getRowStyle"
    :is="groupContext?.isVirtualized ? 'div' : TListViewItem"
    :fixed="props.rowIndex === groupContext.fixedIndexRow"
    ref="tableRowRef"
    @click="handlerClick"
    @mouseenter.capture="handlerMouseEnter(true)"
    @mouseout.capture="handlerMouseOut(false)"
  >
    <TTableCol v-for="(col, index) in groupContext.columns" :key="col.prop" :col="col" :colIndex="index" />
  </component>
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
  const { changeRow, state: groupState } = groupContext;
  if (changeRow === "none") return;
  // 已经选中取消选择
  if (isChange.value) {
    groupState.changeRows = groupState.changeRows.filter(changeRow => changeRow !== props.row);
  }
  // 判断单选多选
  else if (changeRow === "single") {
    groupState.changeRows = [props.row];
  } else if (changeRow === "multiple") {
    groupState.changeRows.push(props.row);
  }
  if (isChange.value) emit("change", groupState.changeRows);
};
/**
 * 当前change状态
 */
const isChange = computed(() => {
  return groupContext.state.changeRows.some(changeRow => changeRow === props.row);
});

/**
 * 动态样式
 */
const getRowStyle = computed((): StyleValue => {
  const { rowIndex, hoverBgColor, isHead, defBgColor } = props;
  const { stripe, fixedIndexRow, state: groupState, rowStyle, isVirtualized } = groupContext;
  let bgColor = defBgColor;
  const isFixed = rowIndex === fixedIndexRow && groupState.isFixedTop;
  // 表头样式固定
  if (isHead) return Object.assign({ backgroundColor: bgColor });
  // 设置斑马纹(默认取hover颜色)
  if (stripe && rowIndex % 2 === 0) bgColor = isBoolean(stripe) && stripe ? hoverBgColor : stripe.toString();
  // 固定行样式
  if (isFixed) bgColor = groupContext.headBgColor;
  return Object.assign(
    {
      backgroundColor: state.isHover || isChange.value ? hoverBgColor : bgColor
    },
    rowStyle ? rowStyle(props.row, isFixed) : {},
    {
      // 虚拟列表需要填充高度
      height: isVirtualized ? "100%" : void 0
    }
  );
});
const getRowClass = computed(() => {
  return ["t-table-row", props.isHead && "t-table-row-head"];
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
