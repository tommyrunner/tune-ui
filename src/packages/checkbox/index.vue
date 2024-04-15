<template>
  <span :class="getClass" :checked="isChecked" @click="handChecked">
    <div class="custom-checkbox-span" v-if="!props.icon && slot.checkboxSpan">
      <slot name="checkboxSpan" :value="modelValue" />
    </div>
    <span :class="['checkbox-span', `checkbox-span-${props.radius}`]" v-else-if="!props.icon">
      <TIcon icon="success" color="white" v-if="isChecked" />
    </span>
    <TIcon class="checkbox-icon" :icon="props.icon" v-else />
    <input type="checkbox" :name="props.name" :value="props.value" />
    <span :class="getTitleClass"><slot /></span>
  </span>
</template>
<script lang="ts" setup>
import { type PropsType, type EmitsType } from './checkbox'
import { useVModel } from '@vueuse/core'
import { TIcon } from '..'
import { computed, inject, useSlots } from 'vue'
import { configOptions } from '@/hooks/useOptions'
import { type GroupContextType, checkboxGroupKey } from './constants'
defineOptions({ name: 'TCheckbox' })
const emit = defineEmits<EmitsType>()
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  radius: 'square',
  disabled: false
})
const slot = useSlots()
const vis = useVModel(props, 'modelValue', emit)
const groupContext = inject<GroupContextType | undefined>(checkboxGroupKey, void 0)
/**
   span的class配置
   custom-span 代表有自定义组件代替了span，需要修复样式
 **/
const getTitleClass = computed(() => {
  const base = ['title', props.disabled && 'is-disabled', (slot.checkboxSpan || props.icon) && 'custom-span']
  return base
})
const getClass = computed(() => {
  const base = ['t-checkbox', `checkbox-size-${props.size}`, props.disabled && 'is-disabled']
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
  // model值
  const visValue = groupContext?.objKey && vis.value ? (vis.value as any)[modelObjKey.value] : vis.value
  // 组件绑定value值
  const propValue = modelObjKey.value ? (props.value as any)[modelObjKey.value] : props.value
  // 如果是组合组件
  if (groupContext && groupContext.modelValue) {
    // 是对象属性
    if (modelObjKey.value) {
      return groupContext.modelValue.some((v: any) => v[modelObjKey.value] === propValue)
    } else {
      return groupContext.modelValue.includes(propValue)
    }
  } else {
    // 是对象属性
    if (modelObjKey.value && vis.value) {
      return (vis.value as any)[modelObjKey.value] === propValue
    } else return visValue === propValue
  }
})

const modelObjKey = computed((): string => {
  if (groupContext) return groupContext.objKey || ''
  return props.objKey || ''
})
const handChecked = () => {
  if (props.disabled) return
  if (groupContext) {
    groupContext.changeEvent(isChecked.value, props.value)
  } else vis.value = isChecked.value ? void 0 : props.value
  emit('change', vis.value)
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
./checkbox
