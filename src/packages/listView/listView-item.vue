<template>
  <li class="t-listView-item">1</li>
</template>
<script lang="ts" setup>
import type { PropsType } from './listView-item'
import { type GroupContextType, listViewGroupKey } from './constants'
import { computed, inject, onMounted, ref } from 'vue'
import { isValue } from '@/utils/is'
defineOptions({ name: 'TListViewItem' })
const props = withDefaults(defineProps<PropsType>(), {
  disabled: false
})
const tabsRef = ref()
const groupContext = inject<GroupContextType | undefined>(listViewGroupKey, {})

/**
 * 组合使用时会失效
 */
const isChecked = computed(() => {
  return props.value === groupContext.model
})
/**
 * 处理选中事件
 */
const handlerChecked = () => {
  if (props.disabled) return
  groupContext.changeEvent(tabsRef.value, props.value, true, true)
}
// 初始化选中
onMounted(() => {
  if (!isValue(groupContext)) return console.warn('The tabs component is missing the tabs-group component')
  if (isChecked.value) handlerChecked()
})
</script>
<style lang="scss" scoped>
@import './listView-item.scss';
</style>
