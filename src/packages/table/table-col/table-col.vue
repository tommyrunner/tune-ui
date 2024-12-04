<template>
  <!-- 组合 -->
  <TableGroup v-if="col.children && col.children.length" :group-col="col" />
  <!-- 单元格 -->
  <TableCell v-else :col="col" />
</template>
<script lang="ts" setup>
import { provide, reactive, toRefs } from "vue";
import { PropsType } from "./table-col";
import TableGroup from "./col-group/col-group.vue";
import TableCell from "./col-cell/col-cell.vue";
import { type GroupContextTableColType, tableColGroupKey } from "../constants";
defineOptions({ name: "TTableCol" });
const props = withDefaults(defineProps<PropsType>(), {});
provide<GroupContextTableColType>(tableColGroupKey, reactive({ ...toRefs(props) }));
</script>
