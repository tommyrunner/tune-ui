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
import { computed, StyleValue } from 'vue'
import { defaultProps, emits, type PropsType } from './button'
import { TIcon } from '..'
import { IconTypes } from '../icon/icon'
defineOptions({ name: 'TButton' })
const emit = defineEmits(emits)
const props = withDefaults(defineProps<PropsType>(), defaultProps)
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
