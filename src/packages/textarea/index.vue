<template>
  <div :class="getClass" @click="updateCursor">
    <span class="tip" v-if="getTip">{{ getTip }}</span>
    <textarea
      ref="textareaRef"
      v-model="model"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :maxlength="props.maxlength"
      @focus="emit('focus', model)"
      @blur="emit('blur', model)"
      @keyup="handleKeyup"
      @input="handleInput"
    />
    <div class="point" v-if="props.maxlength">
      <span>[{{ cursor }}]{{ model?.length }}/{{ props.maxlength }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { configOptions } from '@/hooks/useOptions'
import type { EmitsType, PropsType } from './textarea'
import { computed, ref } from 'vue'
import { isFunction, isKeyboard } from '@/utils'
defineOptions({ name: 'TTextarea' })
const textareaRef = ref()
const emit = defineEmits<EmitsType>()
const props = withDefaults(defineProps<PropsType>(), {
  debounce: undefined,
  isTipe: true,
  clearable: true,
  size: configOptions.value.elSize,
  isEnter: true,
  disabled: false,
  debounceDelay: 1200
})
const model = defineModel<string>()
const cursor = ref(0)

const getClass = computed(() => {
  const { isResize, disabled } = props
  return ['t-textarea', !disabled && isResize && 'resize', disabled && 'is-disabled']
})
const getTip = computed(() => {
  return props.isTipe && model.value && (props.placeholder || props.tip)
})
const handleKeyup = (event: KeyboardEvent) => {
  if (isKeyboard(event, 'enter')) emit('enter', model.value)
  updateCursor()
}
// 计算光标行数
const updateCursor = () => {
  if (!model.value) return
  let index = textareaRef.value.selectionStart
  let startText = model.value.slice(0, index)
  cursor.value = startText.split('\n').length
}
let tmieout: undefined | NodeJS.Timeout = void 0
// 输入处理
const handleInput = () => {
  const value = model.value
  // 限制回车
  if (!props.isEnter && value && value.includes('\n')) {
    return (model.value = value.replace('\n', ''))
  }
  // 限制长度
  if (value && props.maxlength && value.length > props.maxlength) {
    return (model.value = value.slice(0, props.maxlength))
  }
  emit('input', value)
  // 优化处理:如果没绑定防抖事件直接返回
  if (!props.debounce) return
  // 防抖处理
  if (tmieout) clearTimeout(tmieout)
  tmieout = setTimeout(() => {
    if (props.debounce) {
      let reFun = props.debounce(value)
      isFunction(reFun) && reFun()
    }
    clearTimeout(tmieout)
  }, props.debounceDelay)
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
