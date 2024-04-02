<template>
  <div :class="['t-flex']" :style="getStyle" ref="flexRef">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import type { PropsType } from './flex'
import { computed, ref, watch, type StyleValue, onMounted, onDeactivated } from 'vue'
defineOptions({ name: 'TFlex' })
const props = withDefaults(defineProps<PropsType>(), {
  spans: () => [],
  gap: 12,
  justify: 'start',
  itemDisplay: 'inline-block',
  sort: () => [],
  offset: () => []
})
const flexRef = ref()
const getStyle = computed((): StyleValue => {
  return {
    gap: `${props.gap}px`,
    alignItems: props.align,
    justifyContent: props.justify
  }
})
// 监听spans变化，动态更新响应式布局
watch(() => props.spans, updateLayout, { immediate: true })
// TODO: 做优化处理
window.addEventListener('resize', updateLayout)
onMounted(updateLayout)
onDeactivated(() => {
  window.removeEventListener('resize', updateLayout)
})
function updateLayout() {
  if (flexRef.value) {
    // 获取所有子元素
    const children = [...flexRef.value.children]
    // 得出需要减去的间隔宽度
    let gapVal = (props.gap * (children.length - 1)) / children.length
    // 处理响应式
    let span = props.spans
    let w = window.innerWidth
    if (w >= 1920 && props.xl?.length) {
      span = props.xl
    } else if (w >= 1200 && props.lg?.length) {
      span = props.lg
    } else if (w >= 768 && props.sm?.length) {
      span = props.sm
    } else if (props.xs?.length) {
      span = props.xs
    }
    children.forEach((child: HTMLElement, index: number) => {
      let isShow = false
      // 处理超出值
      if (span[index] > 10) span[index] = 10
      if (span[index] < 0 || span[index] === 0) {
        // 如果为0，默认不显示
        span[index] = 0
        isShow = true
      }
      /**
       * 处理对齐
       * 处理元素宽度
       * 处理排序
       * 处理左偏移度
       */
      child.style.cssText = `
        display: ${isShow ? 'none' : props.itemDisplay};
        width: calc(${span[index] * 10}% - ${gapVal}px);
        order: ${props.sort[index]};
        margin-left:${props.offset[index] * 10}%;
        transition: 0.22s;
      `
    })
  }
}
defineExpose({
  updateLayout
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
./flex
