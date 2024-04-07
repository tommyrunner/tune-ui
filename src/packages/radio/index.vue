<template>
  <span
    :class="getClass"
    :t-group="!props.disabled ? 't-radio' : void 0"
    :checked="props.value === vis"
    :size="props.size"
    :_value="props.value"
    @click="handChecked"
  >
    <div class="custom-radio-span" v-if="!props.icon && slot.radioSpan">
      <slot name="radioSpan" :value="vis" />
    </div>
    <span :class="['radio-span', `radio-span-${props.radius}`]" v-else-if="!props.icon" />
    <TIcon class="radio-icon" :icon="props.icon" :type="props.value === vis ? 'primary' : 'default'" v-else />
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
import { useVModel } from '@vueuse/core'
import { TIcon } from '..'
import { computed, useSlots } from 'vue'
import { baseProps } from '@/utils'
defineOptions({ name: 'TRadio' })
const emit = defineEmits<EmitsType>()
const props = withDefaults(
  defineProps<PropsType>(),
  baseProps<PropsType>({
    size: 'default',
    radius: 'default',
    disabled: false
  })
)
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
  return ['t-radio', props.disabled && 'is-disabled']
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
