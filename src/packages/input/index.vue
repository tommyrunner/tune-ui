<template>
  <div :class="getClass">
    <TIcon color="#757575" :size="14" :icon="props.prefixIcon" class="prefix-icon" v-if="props.prefixIcon" />
    <span class="tip" v-if="getTip">{{ getTip }}</span>
    <input
      ref="inputRef"
      v-model="model"
      :type="getInputType"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :maxlength="props.maxlength"
      @focus="emit('focus', model)"
      @blur="emit('blur', model)"
      @keyup.enter="emit('enter', model)"
      @input="handleInput"
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
import type { EmitsType, PropsType } from './input'
import { InputTypeHTMLAttribute, computed, ref, getCurrentInstance } from 'vue'
import { TIcon } from '../icon'
defineOptions({ name: 'TInput' })
const inputRef = ref()
const emit = defineEmits<EmitsType>()
const instance = getCurrentInstance()
const props = withDefaults(defineProps<PropsType>(), {
  isTipe: true,
  clearable: true,
  size: configOptions.value.elSize,
  loading: false,
  disabled: false
})
const model = defineModel<string>()
const isPreview = ref(false)

const getClass = computed(() => {
  return [
    't-input',
    `t-input-size-${props.size}`,
    props.password && 'password',
    props.clearable && 'clearable',
    (props.disabled || props.loading) && 'is-disabled'
  ]
})
const getTip = computed(() => {
  return props.isTipe && model.value && (props.placeholder || props.tip)
})
const getInputType = computed((): InputTypeHTMLAttribute => {
  return props.password && !isPreview.value ? 'password' : 'text'
})
const isRightIcon = computed(() => {
  return model.value && (props.clearable || props.password)
})
const handleClear = () => {
  model.value = ''
  emit('clear')
}
let tmieout: undefined | NodeJS.Timeout = void 0
const handleInput = () => {
  emit('input', model.value)
  // 如果没绑定防抖事件直接返回
  console.dir(instance)
  if (tmieout) clearTimeout(tmieout)
  tmieout = setTimeout(() => {
    emit('debounce', model.value)
    clearTimeout(tmieout)
  }, 1200)
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
