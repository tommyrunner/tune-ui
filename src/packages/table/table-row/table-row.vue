<template>
  <div
    :class="getRowClass"
    :style="getRowStyle"
    @click="handleClick"
    @mouseenter.capture="handleMouseEnter(true)"
    @mouseout.capture="handleMouseOut(false)"
  >
    <TTableCol v-for="(col, index) in groupContext.columns" :key="col.prop" :col="col" :col-index="index" />
  </div>
</template>

<script lang="ts" setup>
import "./table-row.scss";
import { computed, inject, provide, StyleValue, toRefs } from "vue";
import { tableRowGroupKey, tableGroupKey, type GroupContextTableRowType, type GroupContextType } from "../constants";
import { EmitsType, PropsType } from "./table-row";
import TTableCol from "../table-col/table-col.vue";
import { reactive } from "vue";
import { isBoolean } from "@/utils/is";

defineOptions({ name: "TTableRow" });

const props = withDefaults(defineProps<PropsType>(), {
  hoverBgColor: "#f5f7fa",
  defBgColor: "#fff"
});

const emit = defineEmits<EmitsType>();

const groupContext = inject<GroupContextType | undefined>(tableGroupKey, void 0);

const state = reactive({
  isHover: false
});

/** 处理鼠标进入 */
const handleMouseEnter = (is: boolean) => {
  state.isHover = is;
};

/** 处理鼠标离开 */
const handleMouseOut = (is: boolean) => {
  state.isHover = is;
};

/** 处理行点击 */
const handleClick = () => {
  emit("click-row", props.row);
};

/** 获取行样式 */
const getRowStyle = computed((): StyleValue => {
  const { rowIndex, hoverBgColor, isHead, isFoot, defBgColor, row } = props;
  const { stripe, isVirtualized, rowStyle } = groupContext;

  let bgColor = defBgColor;

  // 表头样式固定
  if (isHead || isFoot) {
    return { backgroundColor: hoverBgColor };
  }

  // 设置斑马纹
  if (stripe && rowIndex % 2 === 0) {
    bgColor = isBoolean(stripe) ? hoverBgColor : stripe.toString();
  }

  return {
    backgroundColor: state.isHover || row[groupContext.changeKey] ? hoverBgColor : bgColor,
    height: isVirtualized ? "100%" : "auto",
    ...(rowStyle?.(rowIndex, props.row) as Object)
  };
});

/** 获取行类名 */
const getRowClass = computed(() => {
  const { isHead, isFoot } = props;
  return ["t-table-row", isHead && "t-table-row-head", isFoot && "t-table-row-foot"];
});

// 提供行上下文
provide<GroupContextTableRowType>(
  tableRowGroupKey,
  reactive({
    ...toRefs(props)
  })
);
</script>
