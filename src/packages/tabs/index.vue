<template>
  <span :class="getTabsClass" :checked="isChecked" @click="handlerChecked" ref="tabsRef">
    <TIcon :icon="props.icon" v-if="props.icon" :size="18" />
    <span :class="getLabelClass"><slot /></span>
    <TIcon class="_icon-close" icon="close" v-if="groupContext.isClose" :size="18" @click="handlerClose" />
  </span>
</template>
<script lang="ts" setup>
import type { PropsType } from './tabs'
import { type GroupContextType, radioGroupKey } from './constants'
import { TIcon } from '../icon'
import { computed, inject, onMounted, ref } from 'vue'
defineOptions({ name: 'TTabs' })
const props = withDefaults(defineProps<PropsType>(), {
  disabled: false
})
const tabsRef = ref()
const groupContext = inject<GroupContextType | undefined>(radioGroupKey, void 0)

//  Label class配置
const getLabelClass = computed(() => {
  return ['_label', props.disabled && 't-disabled']
})
//  tabs class配置
const getTabsClass = computed(() => {
  const { disabled } = props
  const { gap, type } = groupContext
  return ['t-tabs', disabled && 't-disabled', gap <= 0 && 't-tabs-full', `t-tabs-type-${type}`]
})
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
/**
 * 处理关闭事件
 */
const handlerClose = () => {
  // 如果删除的当前选中项，设置未选中
  if (isChecked.value) groupContext.changeEvent(tabsRef.value, props.value, false, false)
  groupContext.handlerClose(props.value)
}
// 初始化选中
onMounted(() => {
  if (isChecked.value) handlerChecked()
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
