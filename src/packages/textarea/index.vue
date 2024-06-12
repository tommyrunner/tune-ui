<template>
  <div :class="getClass">
    <TIcon :size="14" :icon="props.prefixIcon" class="prefix-icon" v-if="props.prefixIcon" />
    <span class="tip" v-if="getTip">{{ getTip }}</span>
    <input
      ref="inputRef"
      v-model="value"
      :type="getInputType"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :maxlength="props.maxlength"
    />
    <transition name="right-icon">
      <div class="right-icon" v-if="isRightIcon">
        <TIcon
          v-if="props.password"
          :icon="isPreview ? 'preview' : 'unpreview'"
          color="#656a6e88"
          class="clear"
          @click="isPreview = !isPreview"
        />
        <TIcon v-if="props.clearable" icon="close-to" color="#656a6e88" class="clear" @click="handleClear" />
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { configOptions } from '@/hooks/useOptions'
import type { EmitsType, PropsType } from './textarea'
import { InputTypeHTMLAttribute, computed, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { TIcon } from '../icon'
defineOptions({ name: 'TTextarea' })
const inputRef = ref()
const emit = defineEmits<EmitsType>()
const props = withDefaults(defineProps<PropsType>(), {
  modelValue: '',
  isTipe: true,
  clearable: true,
  size: configOptions.value.elSize,
  loading: false,
  disabled: false
})
const value = useVModel(props, 'modelValue', emit)
const isPreview = ref(false)

const getClass = computed(() => {
  return [
    't-input',
    props.password && 'password',
    props.clearable && 'clearable',
    (props.disabled || props.loading) && 'is-disabled'
  ]
})
const getTip = computed(() => {
  return props.isTipe && props.modelValue && (props.placeholder || props.tip)
})
const getInputType = computed((): InputTypeHTMLAttribute => {
  return props.password && !isPreview.value ? 'password' : 'text'
})
const isRightIcon = computed(() => {
  return props.modelValue && (props.clearable || props.password)
})
const handleClear = () => {
  value.value = ''
  emit('clear')
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
./textarea
