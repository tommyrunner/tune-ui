<template>
  <div :class="getClass" @click="updateCursor">
    <span class="_t-textarea-tip" v-if="getTip">{{ getTip }}</span>
    <textarea
      ref="textareaRef"
      v-model="model"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :maxlength="props.maxlength"
      @focus="emit('focus', model)"
      @blur="handleBlur"
      @keyup="handleKeyup"
      @input="handleInput"
    />
    <div class="_t-textarea-point" v-if="props.maxlength">
      <span>{{ getPointText }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { EmitsType, PropsType } from './textarea'
import { configOptions } from '@/hooks/useOptions'
import { computed, ref } from 'vue'
import { isKeyboard } from '@/utils'
import { bindDebounce } from '@/utils'
defineOptions({ name: 'TTextarea' })
const textareaRef = ref()
const emit = defineEmits<EmitsType>()
const props = withDefaults(defineProps<PropsType>(), {
  debounce: undefined,
  isTipe: true,
  size: configOptions.value.elSize,
  isEnter: true,
  disabled: false,
  isResize: true,
  isCursor: true,
  debounceDelay: 1000
})
const model = defineModel<string>()
const cursor = ref(0)

const getClass = computed(() => {
  const { isResize, disabled } = props
  return ['t-textarea', !disabled && isResize && 't-textarea-resize', disabled && 't-disabled']
})
const getTip = computed(() => {
  return props.isTipe && model.value && (props.placeholder || props.tip)
})
const getPointText = computed(() => {
  return (props.isCursor ? `[${cursor.value}]` : '') + (model.value?.length + '/' + props.maxlength)
})
/**
 * 处理键盘事件
 * @param event 事件值
 */
const handleKeyup = (event: KeyboardEvent) => {
  if (isKeyboard(event, 'enter')) emit('enter', model.value)
  updateCursor()
}
/**
 * 处理失去焦点
 */
const handleBlur = () => {
  cursor.value = 0
  emit('blur', model.value)
}
// 计算光标行数
const updateCursor = () => {
  if (!model.value) return
  let index = textareaRef.value.selectionStart
  let startText = model.value.slice(0, index)
  cursor.value = startText.split('\n').length
}
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
  bindDebounce(props.debounce, props.debounceDelay, model.value)
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
