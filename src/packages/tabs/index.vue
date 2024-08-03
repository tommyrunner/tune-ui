<template>
  <span :class="getClass" :checked="isChecked" @click="handChecked" ref="tabsRef">
    <TIcon class="_icon" :icon="props.icon" v-if="props.icon" />
    <span :class="getTitleClass"><slot /></span>
  </span>
</template>
<script lang="ts" setup>
import type { PropsType, ValueType, EmitsType } from './tabs'
import { type GroupContextType, radioGroupKey } from './constants'
import { TIcon } from '../icon'
import { computed, inject, onMounted, ref } from 'vue'
import { configOptions } from '@/hooks/useOptions'
defineOptions({ name: 'TRadio' })
const emit = defineEmits<EmitsType>()
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  radius: 'default',
  disabled: false
})
const model = defineModel<ValueType>()
const tabsRef = ref()
const groupContext = inject<GroupContextType | undefined>(radioGroupKey, void 0)
/**
   span的class配置
   custom-span 代表有自定义组件代替了span，需要修复样式
 **/
const getTitleClass = computed(() => {
  const base = ['_label', props.disabled && 't-disabled']
  return base
})
const getClass = computed(() => {
  const { disabled } = props
  const base = ['t-tabs', disabled && 't-disabled']
  // 组合样式
  if (groupContext) {
    return [...base, `_type-${groupContext.type}`, `_direction-${groupContext.direction}`]
  }
  return base
})
/**
 * 组合使用时会失效
 */
const isChecked = computed(() => {
  return props.value === groupContext.model
})
const handChecked = () => {
  if (props.disabled) return
  groupContext.changeEvent(tabsRef.value, props.value)
  emit('change', model.value)
}
onMounted(() => {
  if (isChecked.value) handChecked()
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
