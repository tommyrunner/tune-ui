<template>
  <Teleport :to="props.appendTo">
    <div
      :class="getMessageClass"
      v-bind="{ [messageTag]: messageTag }"
      :style="getMessageStyle"
      :id="state.messageId"
      ref="messageRef"
    >
      <TIcon :icon="getIcon" :size="18" />
      <span v-html="props.content"></span>
      <TIcon v-if="props.isClose" icon="close" class="_icon-close" :size="18" @click="closeMessage" />
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
import type { PropsType } from './types'
import type { IconTypes } from '../icon/icon'
import { computed, onDeactivated, onMounted, reactive, ref } from 'vue'
import { messageGap, messageTag, messageVNodeAll } from './method'
import { messageClass } from './messageCall'
import { fromCssVal, generateId, isDownKeyboard } from '@/utils'
import { TIcon } from '../icon'
import { isFunction } from '@/utils/is'
defineOptions({ name: 'TMessage' })
const props = withDefaults(defineProps<PropsType>(), {
  type: 'info',
  messageType: 'default',
  appendTo: 'body',
  closeOnPressEscape: true,
  custom: () => ({
    x: '50%',
    y: `${messageGap}px`
  }),
  radius: () => [6, 6, 6, 6],
  padding: () => [8, 12, 8, 12],
  boxShadow: () => [0, 0, 4, 'rgba(0, 0, 0, 0.5)']
})
const messageRef = ref()
const state = reactive({
  messageId: 't-message-0'
})
onMounted(() => {
  state.messageId = `t-message-${generateId()}`
  window.addEventListener('keydown', keydownHandler)
})
onDeactivated(() => {
  window.removeEventListener('keydown', keydownHandler)
})
/**
 * 处理message按下esc关闭事件
 */
const keydownHandler = (event: KeyboardEvent) => {
  if (props.closeOnPressEscape && isDownKeyboard(event, 'escape')) {
    messageVNodeAll[messageVNodeAll.length - 1].closeMessage()
  }
}

const getIcon = computed((): IconTypes => {
  const { type, icon } = props
  // 优先指定
  if (icon) return icon
  switch (type) {
    case 'info':
      return 'help'
    case 'success':
      return 'success-to'
    case 'warning':
      return 'illustrate'
    case 'danger':
      return 'close-to'
    default:
      return 'help'
  }
})
const getMessageClass = computed(() => {
  const { type, plain } = props
  return [messageClass, `t-message-type-${type}`, plain && `t-message-plain-${type}`]
})
const getMessageStyle = computed(() => {
  const { padding = [], radius = [], custom } = props
  return {
    padding: `${fromCssVal(padding)}`,
    borderRadius: `${fromCssVal(radius)}`,
    left: custom.x,
    top: custom.y
  }
})
const closeMessage = () => {
  if (!messageRef.value) return
  messageRef.value.classList.add('t-message-close')
  messageRef.value.addEventListener('animationend', removeElement)
}
const removeElement = function (event: MouseEvent) {
  const { closeCallback } = props
  const element = event.target as HTMLElement
  element.remove() // 从DOM中移除元素
  // 移除事件监听器
  element.removeEventListener('animationend', removeElement)
  messageVNodeAll.pop()
  if (closeCallback && isFunction(closeCallback)) closeCallback(state.messageId)
}
defineExpose({
  closeMessage
})
</script>
<style lang="scss" scoped>
@import 'message.scss';
</style>
