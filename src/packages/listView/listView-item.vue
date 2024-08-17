<template>
  <li :class="getListViewItemClass" :style="getListViewItemStyle">
    <slot :row="props" />
  </li>
</template>
<script lang="ts" setup>
import type { PropsType } from './listView-item'
import { computed, onMounted, StyleValue } from 'vue'
defineOptions({ name: 'TListViewItem' })
const props = withDefaults(defineProps<PropsType>(), {
  isVirtualized: false,
  disabled: false
})
// const tabsRef = ref()
// const groupContext = inject<GroupContextType | undefined>(listViewGroupKey, {})

/**
 * 组合使用时会失效
 */
// const isChecked = computed(() => {
//   return props.value === groupContext.model
// })

// 初始化选中
onMounted(() => {
  // if (!isValue(groupContext)) return console.warn('The tabs component is missing the tabs-group component')
  // if (isChecked.value) handlerChecked()
})
const getListViewItemClass = computed(() => {
  const { isVirtualized } = props
  return ['t-listView-item', isVirtualized && 't-listView-item-virtualized']
})
const getListViewItemStyle = computed((): StyleValue => {
  return {
    top: `${props.top}px`
  }
})
</script>
<style lang="scss" scoped>
@import './listView-item.scss';
</style>
