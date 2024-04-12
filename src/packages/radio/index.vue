<template>
  <span
    :class="getClass"
    t-group="t-radio"
    :t-group-disabled="props.disabled ? 'disabled' : void 0"
    :checked="isChecked"
    :_value="props.value"
    @click="handChecked"
  >
    <div class="custom-radio-span" v-if="!props.icon && slot.radioSpan">
      <slot name="radioSpan" :value="vis" />
    </div>
    <span :class="['radio-span', `radio-span-${props.radius}`]" v-else-if="!props.icon" />
    <TIcon class="radio-icon" :icon="props.icon" v-else />
    <input type="radio" :name="props.name" :value="props.value" />
    <span :class="getTitleClass"><slot /></span>
  </span>
</template>
<script lang="ts" setup>
/**
 * @displayName Radio 单选框
 *  t-group="t-radio" : 代表支持t-group组件组合
 * _value : 内部标记值(用于标记当前组件状态)
 */
import { type PropsType, type EmitsType } from './radio'
import { isObject, useVModel } from '@vueuse/core'
import { TIcon } from '..'
import { computed, useSlots } from 'vue'
import { configOptions } from '@/hooks/useOptions'
defineOptions({ name: 'TRadio' })
const emit = defineEmits<EmitsType>()
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  radius: 'default',
  disabled: false
})
const slot = useSlots()
const vis = useVModel(props, 'modelValue', emit)
/**
   span的class配置
   custom-span 代表有自定义组件代替了span，需要修复样式
 **/
const getTitleClass = computed(() => {
  return ['title', props.disabled && 'is-disabled', (slot.radioSpan || props.icon) && 'custom-span']
})
const getClass = computed(() => {
  return ['t-radio', `radio-size-${props.size}`, props.disabled && 'is-disabled']
})
/**
 * 组合使用时会失效
 */
const isChecked = computed(() => {
  // 处理对象类型
  if (isObject(vis.value) && props.objKey) {
    return (props.value as any)[props.objKey] === (vis.value as any)[props.objKey]
  } else return props.value === vis
})
const handChecked = () => {
  if (props.disabled) return
  vis.value = props.value
  emit('change', vis.value)
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
