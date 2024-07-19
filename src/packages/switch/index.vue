<template>
  <div :class="getClass" @click="handleClick">
    <div class="_bg _bg1" :style="{ backgroundColor: props.offBgColor }">
      <slot name="offContent" />
    </div>
    <div class="_bg _bg2" :style="{ backgroundColor: props.onBgColor }">
      <slot name="onContent" />
    </div>
    <div class="_action">
      <TIcon v-if="props.loading" icon="loading" :class="`${props.loading && 't-loading'}`" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { EmitsType, PropsType } from './switch'
import { configOptions } from '@/hooks/useOptions'
import { computed } from 'vue'
import { TIcon } from '..'
defineOptions({ name: 'TSwitch' })
const emit = defineEmits<EmitsType>()
const model = defineModel<boolean>()
const props = withDefaults(defineProps<PropsType>(), {
  size: configOptions.value.elSize,
  loading: false,
  disabled: false
})
const getClass = computed(() => {
  const { size, radius, disabled, loading } = props
  return [
    't-switch',
    `t-switch-${model.value ? 'on' : 'off'}`,
    `t-switch-size-${size}`,
    `t-switch-radius-${radius}`,
    (disabled || loading) && 't-disabled'
  ]
})
const handleClick = () => {
  if (!props.disabled && !props.loading) {
    model.value = !model.value
    emit('change', model.value)
  }
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
