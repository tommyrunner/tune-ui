<template>
  <Teleport :to="props.appendTo">
    <div
      :class="getMessageClass"
      v-bind="{ [MESSAGE_TAG]: MESSAGE_TAG }"
      :style="getMessageStyle"
      :id="id"
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
import { computed, ref } from 'vue'
import { MESSAGE_GAP, MESSAGE_TAG } from './method'
import { messageClass } from './messageCall'
import { fromCssVal } from '@/utils'
import { TIcon } from '../icon'
import { useMessage } from './hooks'
defineOptions({ name: 'TMessage' })
const props = withDefaults(defineProps<PropsType>(), {
  type: 'info',
  messageType: 'default',
  appendTo: 'body',
  closeOnPressEscape: true,
  custom: () => ({
    x: '50%',
    y: `${MESSAGE_GAP}px`
  }),
  radius: () => [6, 6, 6, 6],
  padding: () => [8, 12, 8, 12],
  boxShadow: () => [0, 0, 4, 'rgba(0, 0, 0, 0.5)']
})
// 节点
const messageRef = ref()
// 处理基础事件
const { id, closeMessage } = useMessage(props, messageRef)
/**
 * 动态获取icon
 */
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
/**
 * 动态设置class
 */
const getMessageClass = computed(() => {
  const { type, plain } = props
  return [messageClass, `t-message-type-${type}`, plain && `t-message-plain-${type}`]
})
/**
 * 动态设置style样式
 */
const getMessageStyle = computed(() => {
  const { padding = [], radius = [], custom, width } = props
  return {
    width,
    padding: `${fromCssVal(padding)}`,
    borderRadius: `${fromCssVal(radius)}`,
    left: custom.x,
    top: custom.y
  }
})

defineExpose({
  closeMessage
})
</script>
<style lang="scss" scoped>
@import 'message.scss';
</style>
