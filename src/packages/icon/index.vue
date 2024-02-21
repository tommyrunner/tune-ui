<template>
  <i :style="getStyle" :class="['t-icon', 'iconfont', `icon-${props.icon}`, props.primary && 'primary']"><slot /></i>
</template>
<script lang="ts" setup>
import { computed, type StyleValue } from 'vue'
import { defaultProps, type IconPropsType } from './icon'
defineOptions({ name: 'TIcon' })
const props = withDefaults(defineProps<IconPropsType>(), defaultProps)

const getStyle = computed((): StyleValue => {
  return {
    fontSize: `${props.size}px`,
    color: props.color
  }
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
