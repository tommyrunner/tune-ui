<template>
  <div :class="getClass">
    <div class="_range-item" v-for="index in props.isRange ? 2 : 1" :key="index">
      <span class="_tip" v-if="props.isTipe && isValue(props.isRange ? model[index - 1] : model)">
        {{ getTip }}
      </span>
      <input
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
        <div class="_right-icon" v-if="props.isControls && !props.isRange">
          <TIcon icon="caret-up" :color="defIconColor" :size="getIconSize" @click="handlerStep(true)" />
          <TIcon icon="caret-down" :color="defIconColor" :size="getIconSize" @click="handlerStep(false)" />
        </div>
      </transition>
      <div class="_spe" v-if="index !== 2 && props.isRange">
        <slot name="spe">
          <TIcon icon="minus" :color="defIconColor" :size="getIconSize" />
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { EmitsType, ModelType, PropsType } from './input-number'
import type { ElSizeType } from '@/types'
import { configOptions } from '@/hooks/useOptions'
import { computed } from 'vue'
import { TIcon } from '../icon'
import { isValue } from '@/utils/is'
import { bindDebounce } from '@/utils'
defineOptions({ name: 'TInputNumber' })
const emit = defineEmits<EmitsType>()
const props = withDefaults(defineProps<PropsType>(), {
  isTipe: true,
  isControls: true,
  size: configOptions.value.elSize,
  step: 1,
  debounceDelay: 1000
})
const model = defineModel<ModelType>()
const getClass = computed(() => {
  const { size, disabled, isRange, isControls } = props
  return [
    't-input-number',
    `t-input-number-size-${size}`,
    isRange && 't-input-number-range',
    isControls && 't-input-number-controls',
    disabled && 't-disabled'
  ]
})
const getTip = computed(() => {
  return props.placeholder || props.tip
})
const defIconColor = '#656a6e88'
const sizes: { [key in ElSizeType]: number } = {
  default: 14,
  small: 12,
  large: 16
}
const getIconSize = computed(() => {
  return sizes[props.size]
})
// 控制步长
const handlerStep = (is: boolean) => {
  if (is) (model.value as number) += props.step
  else (model.value as number) -= props.step
}
// 输入处理
const handleInput = (target: HTMLInputElement, index: number) => {
  const value = Number(target.value)
  // 处理范围以及单个
  if (props.isRange) model.value[index] = value
  else model.value = value
  emit('input', model.value)
  // 优化处理:如果没绑定防抖事件直接返回
  if (!props.debounce) return
  // 防抖处理
  bindDebounce(props.debounce, props.debounceDelay, value)
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
