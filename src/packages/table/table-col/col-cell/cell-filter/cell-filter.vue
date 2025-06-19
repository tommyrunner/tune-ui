<template>
  <div class="_filter" @click.stop="state.isShowFilter = true">
    <TPopover v-model="state.isShowFilter" type="click">
      <template #content>
        <div class="_filter-list">
          <TCheckbox v-for="(item, index) in props.filters" :key="index" v-model="item.checked" @change="handleChange">
            {{ item.label }}
          </TCheckbox>
        </div>
      </template>
      <TIcon icon="filter" :class="state.isShowFilter && '_icon-active'" />
    </TPopover>
  </div>
</template>
<script lang="ts" setup>
import "./cell-filter.scss";
import type { PropsType } from "./cell-filter";
import {
  type GroupContextType,
  type GroupContextTableColType,
  tableGroupKey,
  tableColGroupKey
} from "@/packages/table/constants";
import { reactive, inject } from "vue";
import { TPopover } from "@/packages/popover";
import { TIcon } from "@/packages/icon";
import { TCheckbox } from "@/packages/checkbox";
const props = withDefaults(defineProps<PropsType>(), {});
const groupContext = inject<GroupContextType | undefined>(tableGroupKey, void 0);
const colGroupContext = inject<GroupContextTableColType | undefined>(tableColGroupKey, void 0);
const state = reactive({
  isShowFilter: false
});
/**
 * 过滤回调
 */
const handleChange = () => {
  groupContext.changeFilter(colGroupContext.col);
};
</script>
