<template>
  <span :class="getClass" :checked="isChecked" @click="handChecked">
    <div class="custom-radio-span" v-if="!props.icon && slot.radioSpan">
      <slot name="radioSpan" :value="modelValue" />
    </div>
    <span :class="['radio-span', `radio-span-${props.radius}`]" v-else-if="!props.icon" />
    <TIcon class="radio-icon" :icon="props.icon" v-else />
    <input type="radio" :name="props.name" :value="props.value" />
    <span :class="getTitleClass"><slot /></span>
  </span>
</template>
<script lang="ts" setup>
import { type PropsType, type EmitsType } from './radio'
import { isObject, useVModel } from '@vueuse/core'
import { TIcon } from '..'
import { computed, inject, useSlots } from 'vue'
import { configOptions } from '@/hooks/useOptions'
import { type GroupContextType, radioGroupKey } from './constants'
defineOptions({ name: 'TRadio' })
const emit = defineEmits<EmitsType>()
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  radius: 'default',
  disabled: false
})
const slot = useSlots()
const vis = useVModel(props, 'modelValue', emit)
const groupContext = inject<GroupContextType | undefined>(radioGroupKey, void 0)
/**
   span的class配置
   custom-span 代表有自定义组件代替了span，需要修复样式
 **/
const getTitleClass = computed(() => {
  const base = ['title', props.disabled && 'is-disabled', (slot.radioSpan || props.icon) && 'custom-span']
  return base
})
const getClass = computed(() => {
  const base = ['t-radio', `radio-size-${props.size}`, props.disabled && 'is-disabled']
  // 组合样式
  if (groupContext) {
    return [...base, `group-type-${groupContext.type}`, `group-direction-${groupContext.direction}`]
  }
  return base
})
/**
 * 组合使用时会失效
 */
const isChecked = computed(() => {
  // 处理对象类型
  if (isObject(modelValue.value) && modelObjKey.value) {
    return (props.value as any)[modelObjKey.value] === (modelValue.value as any)[modelObjKey.value]
  } else {
    // 未值定value默认以boolean类型
    if (typeof vis.value === 'boolean' && !props.value) return vis.value
    return props.value === modelValue.value
  }
})
// 兼容个体以及组合
const modelValue = computed(() => {
  if (groupContext) return groupContext.modelValue
  return vis.value
})
const modelObjKey = computed(() => {
  if (groupContext) return groupContext.objKey
  return props.objKey
})
const handChecked = () => {
  if (props.disabled) return
  if (groupContext) {
    groupContext.changeEvent(props.value)
  } else {
    // 未值定value默认以boolean类型
    if (typeof vis.value === 'boolean' && !props.value) vis.value = !vis.value
    // 则
    else vis.value = props.value
  }
  emit('change', vis.value)
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
