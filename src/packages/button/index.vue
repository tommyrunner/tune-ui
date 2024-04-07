<template>
  <button :class="getClass" :style="getStyle" :scale="props.scale && !props.disabled" autofocus>
    <TIcon v-if="props.startIcon" :icon="startIcon" class="t-button-startIcon" />
    <slot />
    <TIcon
      v-if="props.endIcon || props.loading"
      :icon="endIcon"
      :class="['t-button-endIcon', props.loading && 't-button-loading']"
    />
  </button>
</template>
<script lang="ts" setup>
import type { EmitsType, PropsType } from './button'
import { computed, StyleValue } from 'vue'
import { TIcon } from '..'
import { IconTypes } from '../icon/icon'
import { baseProps } from '@/utils'
defineOptions({ name: 'TButton' })
const emit = defineEmits<EmitsType>()
const props = withDefaults(
  defineProps<PropsType>(),
  baseProps<PropsType>({
    type: 'default',
    loading: false,
    radius: 'default',
    disabled: false,
    scale: true
  })
)
// 处理loading-icon
const endIcon = computed((): IconTypes => {
  if (!props.loading) return props.endIcon
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
  return [
    't-button',
    !props.color && `t-button-type-${props.type}`,
    `t-button-size-${props.size}`,
    `t-button-radius-${props.radius}`,
    (props.disabled || props.loading) && 'is-disabled'
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
