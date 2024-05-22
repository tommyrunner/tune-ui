<template>
  <div :class="getClass" @click="handleClick" :radius="props.radius">
    <div class="bg bg1" :style="{ backgroundColor: props.offBgColor }"><slot name="offContent" /></div>
    <div class="bg bg2" :style="{ backgroundColor: props.onBgColor }"><slot name="onContent" /></div>
    <div class="t-switch-action">
      <TIcon v-if="props.loading" icon="loading" :class="`${props.loading && 't-loading'}`" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { configOptions } from '@/hooks/useOptions'
import type { EmitsType, PropsType } from './switch'
import { computed } from 'vue'
import { TIcon } from '..'
defineOptions({ name: 'TSwitch' })
const emit = defineEmits<EmitsType>()
const props = withDefaults(defineProps<PropsType>(), {
  modelValue: false,
  size: configOptions.value.elSize,
  loading: false,
  disabled: false
})
const getClass = computed(() => {
  return [
    't-switch',
    `t-switch-${props.modelValue ? 'on' : 'off'}`,
    `t-switch-size-${props.size}`,
    (props.disabled || props.loading) && 'is-disabled'
  ]
})
const handleClick = () => {
  if (!props.disabled && !props.loading) emit('change', props.modelValue)
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
