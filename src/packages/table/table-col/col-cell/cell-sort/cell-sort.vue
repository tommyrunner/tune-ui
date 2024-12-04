<template>
  <div class="_sort">
    <TIcon icon="caret-up" :class="props.sort === 'asc' ? '_icon-active' : ''" />
    <TIcon icon="caret-down" :class="props.sort === 'desc' ? '_icon-active' : ''" />
  </div>
</template>
<script lang="ts" setup>
import { TIcon } from "@/packages/icon";
import { PropsType } from "./cell-sort";
const props = defineProps<PropsType>();
</script>
<style lang="scss" scoped>
@import "./cell-sort.scss";
</style>
