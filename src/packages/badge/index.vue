<template>
  <div class="t-badge">
    <div
      v-if="props.value !== props.hiddenValue && props.value"
      :class="[props.isDot ? '_num-dot' : '_num']"
      :style="getStyle"
      ref="badgeRef"
    >
      {{ getModel }}
    </div>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import type { PropsType } from './badge'
import { type StyleValue, computed, ref } from 'vue'
defineOptions({ name: 'TBadge' })
const badgeRef = ref<InstanceType<typeof HTMLDivElement>>()
const props = withDefaults(defineProps<PropsType>(), {
  offsetY: 0,
  offsetX: 0,
  max: 99,
  color: '#f56c6c',
  hiddenValue: 0
})
// 根据props计算样式
const getStyle = computed((): StyleValue => {
  const { offsetWidth = 0, offsetHeight = 0 } = badgeRef.value || {}
  const { offsetX = 0, offsetY = 0, color } = props
  return {
    backgroundColor: color,
    top: `${offsetY - offsetHeight / 2 + 1}px`,
    right: `${offsetX - offsetWidth / 2 + 1}px`
  }
})
const getModel = computed(() => {
  const { max, isDot } = props
  if (isDot) return ''
  if (props.value > max) return `${max}+`
  else return props.value
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
