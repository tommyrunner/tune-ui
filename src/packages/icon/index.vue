<template>
  <i :style="getStyle" :class="getClass">
    <slot />
  </i>
</template>
<script lang="ts" setup>
import type { PropsType } from './icon'
import { computed, type StyleValue } from 'vue'
defineOptions({ name: 'TIcon' })
const props = withDefaults(defineProps<PropsType>(), {
  size: 16,
  icon: 'success-to'
})
const getStyle = computed((): StyleValue => {
  return {
    fontSize: `${props.size}px`,
    color: props.color
  }
})
const getClass = computed(() => {
  return ['t-icon', 'iconfont', `icon-${props.customIcon || props.icon}`, props.type && `color-${props.type}`]
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
