<template>
  <Teleport :to="props.appendTo">
    <div
      :class="getMessageClass"
      v-bind="{ [messageTag]: messageTag }"
      :style="getMessageStyle"
      :id="state.messageId"
      ref="messageRef"
    >
      <div class="_head">
        <span class="_title">
          <TIcon v-if="props.type !== 'info'" :icon="getIcon" :size="18" />
          {{ props.title }}
        </span>
        <TIcon v-if="props.isClose" icon="close" class="_icon-close" :size="24" @click="closeMessage" />
      </div>
      <div class="_content" v-html="props.content"></div>
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
import type { PropsType } from './types'
import type { IconTypes } from '../icon/icon'
import { computed, onDeactivated, onMounted, reactive, ref, StyleValue } from 'vue'
import { messageGap, messageTag, messageVNodeAll } from './method'
import { notificationClass } from './notificationCall'
import { fromCssVal, generateId, isDownKeyboard } from '@/utils'
import { TIcon } from '../icon'
import { isFunction } from '@/utils/is'
defineOptions({ name: 'TNotification' })
const props = withDefaults(defineProps<PropsType>(), {
  width: '340px',
  type: 'info',
  messageType: 'default',
  appendTo: 'body',
  position: 'topRight',
  closeOnPressEscape: true,
  custom: () => ({
    x: '0px',
    y: `${messageGap}px`
  }),
  radius: () => [4, 4, 4, 4],
  padding: () => [12, 16, 12, 16],
  boxShadow: () => [0, 0, 4, 'rgba(0, 0, 0, 0.5)']
})
const messageRef = ref()
const state = reactive({
  messageId: 't-notification-0'
})
onMounted(() => {
  state.messageId = `t-notification-${generateId()}`
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
  const { type, position } = props
  return [notificationClass, `t-notification-type-${type}`, `t-notification-${position}`]
})
const getMessageStyle = computed((): StyleValue => {
  const { padding = [], radius = [], position, custom, width } = props
  // 处理上下初始化位置
  let customX = ['topLeft', 'bottomLeft'].includes(position) ? 'left' : 'right'
  let customY = ['topRight', 'topLeft'].includes(position) ? 'top' : 'bottom'
  return {
    width,
    padding: `${fromCssVal(padding)}`,
    borderRadius: `${fromCssVal(radius)}`,
    [customX]: custom.x,
    [customY]: custom.y
  }
})
const closeMessage = () => {
  if (!messageRef.value) return
  messageRef.value.classList.add(`t-notification-${props.position}-close`)
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
@import 'notification.scss';
</style>
