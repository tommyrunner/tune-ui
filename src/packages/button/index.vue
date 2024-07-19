<template>
  <button :class="getClass" :style="getStyle" autofocus>
    <TIcon v-if="props.prefixIcon" :icon="prefixIcon" class="_prefixIcon" />
    <slot />
    <TIcon
      v-if="props.suffixIcon || props.loading"
      :icon="suffixIcon"
      :class="['_suffixIcon', props.loading && 't-loading']"
    />
  </button>
</template>
<script lang="ts" setup>
import type { EmitsType, PropsType } from './button'
import { type StyleValue, computed } from 'vue'
import { configOptions } from '@/hooks/useOptions'
import { TIcon } from '..'
import { IconTypes } from '../icon/icon'
defineOptions({ name: 'TButton' })
const emit = defineEmits<EmitsType>()
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  type: 'default',
  loading: false,
  radius: 'default',
  disabled: false,
  scale: true
})
// 处理loading-icon
const suffixIcon = computed((): IconTypes => {
  if (!props.loading && props.suffixIcon) return props.suffixIcon
  else return 'loading'
})
const getStyle = computed((): StyleValue => {
  if (props.color) {
    return {
      color: '#ffffff',
      backgroundColor: props.color,
      border: ` 1px solid ${props.color}`
    }
  } else return void 0
})
const getClass = computed(() => {
  const { color, type, size, radius, scale, disabled, loading } = props
  return [
    't-button',
    !color && `t-button-type-${type}`,
    `t-button-size-${size}`,
    `t-button-radius-${radius}`,
    scale && !disabled && `t-button-scale`,
    (disabled || loading) && 't-disabled'
  ]
})
defineExpose({
  handleClick: (evt: MouseEvent) => {
    emit('click', evt)
  }
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
