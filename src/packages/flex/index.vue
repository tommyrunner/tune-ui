<template>
  <div :class="['t-flex']" :style="getStyle" ref="flexRef">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import type { PropsType } from './flex'
import { computed, ref, watch, type StyleValue, onMounted } from 'vue'
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
onMounted(updateLayout)
watch(() => props.spans, updateLayout, { immediate: true })
function updateLayout() {
  if (flexRef.value) {
    // 获取所有子元素
    const children = [...flexRef.value.children]
    // 得出需要减去的间隔宽度
    let gapVal = (props.gap * (children.length - 1)) / children.length
    children.forEach((child: HTMLElement, index: number) => {
      /**
       * 处理对齐
       * 处理元素宽度
       * 处理排序
       * 处理左偏移度
       */
      child.style.cssText = `
        display: ${props.itemDisplay};
        width: calc(${props.spans[index] * 10}% - ${gapVal}px);
        order: ${props.sort[index]};
        margin-left:${props.offset[index] * 10}%;
        transition: 0.22s;
      `
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
./flex
