<template>
  <div class="t-collapse-item">
    <div class="_t-collapse-item-head">
      <div class="title">标题</div>
      <div class="right">
        <TIcon icon="caret-down" color="#999999" />
      </div>
    </div>
    <div class="_t-collapse-item-body">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { TIcon } from '../icon'
defineOptions({ name: 'TCollapseItem' })
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
