<template>
  <div class="_col-group" :style="getColStyle">
    <ColCell v-if="rowGroupContext?.isHead" :col="groupCol" />
    <div class="_col-group-children">
      <TableCol v-for="col in props.groupCol.children" :key="col.prop" :col="col" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import "./col-group.scss";
import { type GroupContextTableRowType, tableRowGroupKey } from "../../constants";
import { computed, inject } from "vue";
import TableCol from "../table-col.vue";
import ColCell from "../col-cell/col-cell.vue";
import { PropsType } from "./col-group";
// 控制多级表头组合单元格
defineOptions({ name: "TTableColGroup" });
const rowGroupContext = inject<GroupContextTableRowType | undefined>(tableRowGroupKey, void 0);
const props = withDefaults(defineProps<PropsType>(), {});
/**
 * 组合列需要适配列的宽度
 */
const getColStyle = computed(() => {
  const { groupCol } = props;
  return {
    // 单独设置宽度
    flex: groupCol.width ? "none" : `1 0`,
    width: `${groupCol.width}px !important`
  };
});
</script>
