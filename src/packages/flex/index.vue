<template>
  <div :class="['t-flex']" :style="getStyle">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { bindThrottle } from '@/utils'
import type { PropsType } from './flex'
import { computed, onDeactivated, ref, StyleValue } from 'vue'
defineOptions({ name: 'TFlex' })
const props = withDefaults(defineProps<PropsType>(), {})
// 处理动态变化
const innerWidth = ref(window.innerWidth)
// 更新屏幕宽度
const updateLayout = bindThrottle(() => {
  innerWidth.value = window.innerWidth
  // console.log(innerWidth.value)
}, 2000)
window.addEventListener('resize', updateLayout)
onDeactivated(() => {
  window.removeEventListener('resize', updateLayout)
})

const getStyle = computed((): StyleValue => {
  const { span, sort, offset, xs, sm, md, lg, xl } = props
  let spanVal = span > 10 ? 10 : span
  // 处理响应式
  let w = innerWidth.value
  if (w >= 1920 && xl) {
    spanVal = xl
  } else if (w >= 1200 && lg) {
    spanVal = lg
  } else if (w >= 992 && md) {
    spanVal = md
  } else if (w >= 768 && sm) {
    spanVal = sm
  } else if (xs) {
    spanVal = xs
  }
  return {
    // 如果<=0默认不显示
    display: span <= 0 ? 'none' : 'inline-block',
    width: spanVal && `calc(${spanVal * 10}%`,
    marginLeft: offset && `${offset * 10}%`,
    order: `${sort}`
  }
})
</script>
<style lang="scss" scoped>
.t-flex {
  transition: 0.33s;
}
</style>
