<template>
  <div
    :class="['t-radio', props.disabled && 'is-disabled']"
    :t-group="!props.disabled ? 't-radio' : void 0"
    :checked="props.value === vis"
    :_value="props.value"
    @click="handChecked"
  >
    <div class="custom-radio-span" v-if="!props.icon && slot.radioSpan">
      <slot name="radioSpan" :value="vis" />
    </div>
    <span class="radio-span" v-else-if="!props.icon" />
    <TIcon class="radio-icon" :icon="props.icon" :type="props.value === vis ? 'primary' : 'default'" v-else />
    <input type="radio" :name="props.name" :value="props.value" />
    <span :class="['title', props.disabled && 'is-disabled', slot.radioSpan && 'custom-title']"><slot /></span>
  </div>
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
import { useSlots } from 'vue'
import { baseProps } from '@/utils'
defineOptions({ name: 'TRadio' })
const emit = defineEmits<EmitsType>()
const props = withDefaults(
  defineProps<PropsType>(),
  baseProps<PropsType>({
    radius: 'default',
    disabled: false
  })
)
const slot = useSlots()
const vis = useVModel(props, 'modelValue', emit)
const handChecked = () => {
  if (props.disabled) return
  vis.value = props.value
  emit('change', vis.value)
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
