<template>
  <TListViewItem
    :class="getRowClass"
    :style="getRowStyle"
    ref="tableRowRef"
    @click="handlerClick"
    @mouseenter.capture="handlerMouseEnter(true)"
    @mouseout.capture="handlerMouseOut(false)"
  >
    <TTableCol v-for="(col, index) in groupContext.columns" :key="col.prop" :col="col" :colIndex="index" />
  </TListViewItem>
</template>
<script lang="ts" setup>
import { computed, inject, provide, ref, StyleValue } from "vue";
import { tableRowGroupKey, tableGroupKey, type GroupContextTableRowType, type GroupContextType } from "../constants";
import { EmitsType, PropsType } from "./table-row";
import { TListViewItem } from "../../listView";
import TTableCol from "../table-col/table-col.vue";
import { reactive } from "vue";
import { isBoolean } from "@/utils/is";
defineOptions({ name: "TTableRow" });
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
  if (groupContext.changeRow === "none") return;
  // 已经选中取消选择
  if (isChange.value) {
    groupContext.state.changeRows = groupContext.state.changeRows.filter(changeRow => changeRow !== props.row);
  }
  // 判断单选多选
  else if (groupContext.changeRow === "single") {
    groupContext.state.changeRows = [props.row];
  } else if (groupContext.changeRow === "multiple") {
    groupContext.state.changeRows.push(props.row);
  }
  if (isChange.value) emit("change", groupContext.state.changeRows);
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
  const { stripe } = groupContext;
  let bgColor = defBgColor;
  // 表头样式固定
  if (isHead) return Object.assign({ backgroundColor: bgColor });
  // 设置斑马纹(默认取hover颜色)
  if (stripe && rowIndex % 2 === 0) bgColor = isBoolean(stripe) && stripe ? hoverBgColor : stripe.toString();
  return Object.assign(
    {
      backgroundColor: state.isHover || isChange.value ? hoverBgColor : bgColor
    },
    groupContext.rowStyle ? groupContext.rowStyle(props.row) : {}
  );
});
const getRowClass = computed(() => {
  return ["t-table-row", props.isHead && "t-table-row-head"];
});

// 抛出操作api，与子组件交互
provide<GroupContextTableRowType>(tableRowGroupKey, props);
</script>
<style lang="scss" scoped>
@import "./table-row.scss";
</style>
