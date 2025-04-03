<template>
  <div class="_filter" @click.stop="state.isShowFilter = true">
    <TPopover v-model="state.isShowFilter" type="click">
      <template #content>
        <div class="_filter-list">
          <TCheckbox v-for="(item, index) in props.filters" :key="index" v-model="item.checked">
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
import { reactive } from "vue";
import { TPopover } from "@/packages/popover";
import { TIcon } from "@/packages/icon";
import { TCheckbox } from "@/packages/checkbox";
const props = withDefaults(defineProps<PropsType>(), {});
const state = reactive({
  isShowFilter: false
});
</script>
