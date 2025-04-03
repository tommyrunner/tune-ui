<template>
  <!-- 组合列 -->
  <TableGroup v-if="col.children?.length" :group-col="col" />
  <!-- 单元格 -->
  <TableCell v-else :col="col" />
</template>

<script lang="ts" setup>
import { type GroupContextTableColType, tableColGroupKey } from "../constants";
import { provide, reactive, toRefs } from "vue";
import { PropsType } from "./table-col";
import TableGroup from "./col-group/col-group.vue";
import TableCell from "./col-cell/col-cell.vue";

defineOptions({ name: "TTableCol" });

const props = withDefaults(defineProps<PropsType>(), {});

// 提供列上下文
provide<GroupContextTableColType>(
  tableColGroupKey,
  reactive({
    ...toRefs(props)
  })
);
</script>
