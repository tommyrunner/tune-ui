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
/**
   span的class配置
   custom-span 代表有自定义组件代替了span，需要修复样式
 **/
const getLabelClass = computed(() => {
  const base = ['_label', props.disabled && 't-disabled']
  return base
})
const getTabsClass = computed(() => {
  const { disabled } = props
  const { gap, type } = groupContext
  const base = ['t-tabs', disabled && 't-disabled', gap <= 0 && 't-tabs-full', `t-tabs-type-${type}`]
  // 组合样式
  if (groupContext) {
    return [...base, `_type-${groupContext.type}`]
  }
  return base
})
/**
 * 组合使用时会失效
 */
const isChecked = computed(() => {
  return props.value === groupContext.model
})
const handlerChecked = () => {
  if (props.disabled) return
  groupContext.changeEvent(tabsRef.value, props.value, true, true)
}
const handlerClose = () => {
  // 如果删除的当前选中项，设置未选中
  if (isChecked.value) groupContext.changeEvent(tabsRef.value, props.value, false, false)
  groupContext.handlerClose(props.value)
}
onMounted(() => {
  if (isChecked.value) handlerChecked()
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
