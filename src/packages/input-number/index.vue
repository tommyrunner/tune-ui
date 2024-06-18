<template>
  <div :class="getClass">
    <div class="range" v-for="index in getRangeLength" :key="index">
      <span class="tip" v-if="getTip">{{ getTip }}</span>
      <input
        ref="inputRef"
        :value="props.isRange ? model[index - 1] : model"
        type="number"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :step="props.step"
        :max="props.maxValue"
        :min="props.minValue"
        @focus="emit('focus', model)"
        @blur="emit('blur', model)"
        @keyup.enter="emit('enter', model)"
        @input="handleInput($event.target as HTMLInputElement, index - 1)"
      />
      <transition name="right-icon">
        <div class="right-icon" v-if="props.isControls && !props.isRange">
          <TIcon icon="caret-up" :color="defIconColor" :size="getIconSize" @click="handlerStep(true)" />
          <TIcon icon="caret-down" :color="defIconColor" :size="getIconSize" @click="handlerStep(false)" />
        </div>
      </transition>
      <div class="spe" v-if="index !== 2 && props.isRange">
        <slot v-if="slot.spe" name="spe" />
        <TIcon v-else icon="minus" :color="defIconColor" :size="getIconSize" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { configOptions } from '@/hooks/useOptions'
import type { EmitsType, PropsType } from './input-number'
import { computed, ref, useSlots } from 'vue'
import { TIcon } from '../icon'
import { ElSizeType } from '@/types'
import { isArray } from 'element-plus/es/utils/types.mjs'
defineOptions({ name: 'TInput' })
const inputRef = ref<HTMLInputElement>()
const emit = defineEmits<EmitsType>()
const props = withDefaults(defineProps<PropsType>(), {
  isTipe: true,
  isControls: true,
  size: configOptions.value.elSize,
  step: 1
})
const model = defineModel<number | number[]>()
const slot = useSlots()
const getClass = computed(() => {
  const { size, disabled, isRange, isControls } = props
  return [
    't-input-number',
    `t-input-number-size-${size}`,
    isRange && 'range',
    isControls && 'controls',
    disabled && 'is-disabled'
  ]
})
const getTip = computed(() => {
  return props.isTipe && (model.value || model.value === 0) && (props.placeholder || props.tip)
})
const sizes: { [key in ElSizeType]: number } = {
  default: 14,
  small: 12,
  large: 16
}
const defIconColor = '#656a6e88'
const getIconSize = computed(() => {
  return sizes[props.size]
})
const getRangeLength = computed(() => {
  return props.isRange ? 2 : 1
})
const handlerStep = (is: boolean) => {
  if (is) (model.value as number) += props.step
  else (model.value as number) -= props.step
}
// 输入处理
const handleInput = (target: HTMLInputElement, index: number) => {
  const value = Number(target.value)
  if (props.isRange && isArray(model.value)) model.value[index] = value
  else model.value = value
  emit('input', model.value)
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
