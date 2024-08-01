import type { PropsType } from './types'
import { createVNode, render } from 'vue'
import { messageClass } from './messageCall'
import { notificationClass } from './notificationCall'
import Message from './message.vue'
import Notification from './notification.vue'

const messageGap = 24
const messageTag = `tui`
// message组件VNode虚拟dom集合
const messageVNodeAll: InstanceType<typeof Message>[] = []
const isNotification = (messageType: PropsType['messageType']) => messageType === 'notice'

function getLastMessage(messageType: PropsType['messageType']) {
  let max = 0
  let lastMessageEl: HTMLElement | undefined = void 0
  const className = isNotification(messageType) ? notificationClass : messageClass
  const messageAllEl: HTMLElement[] = Array.from(document.querySelectorAll(`.${className}[${messageTag}]`))
  messageAllEl.forEach((el) => {
    if (el.offsetTop >= max) {
      max = el.offsetTop
      lastMessageEl = el
    }
  })
  return { lastMessageEl, messageAllEl }
}

function createMessage(props: PropsType) {
  const { duration, maxLength, messageType } = props
  // 判断得出最大的y轴
  const { lastMessageEl, messageAllEl } = getLastMessage(messageType)
  if (messageAllEl.length > maxLength) return
  const custom = initCustom(props, lastMessageEl)
  const VNode = createVNode(isNotification(messageType) ? Notification : Message, {
    ...props,
    ...{ custom }
  })
  render(VNode, document.createElement('div'))
  const component = VNode.component.exposed as InstanceType<typeof Message>
  // 新增message 虚拟dom集合元素
  messageVNodeAll.push(component)
  // 控制是否显示时长
  if (duration) {
    window.setTimeout(() => component.closeMessage(), duration)
  }
  return { VNode: VNode }
}
function initCustom(props: PropsType, lastMessageEl: HTMLElement): PropsType['custom'] {
  const { messageType } = props
  let custom = { x: '50%', y: `${messageGap}px` }
  if (isNotification(messageType)) {
    custom = { x: `${messageGap}px`, y: `${messageGap}px` }
  }
  // 处理下一个位置
  if (lastMessageEl) {
    custom.y = `${lastMessageEl.offsetHeight + lastMessageEl.offsetTop + messageGap}px`
  }
  return custom
}
function initProps(props?: PropsType) {
  return {
    ...{ duration: 2600, maxLength: 8 },
    ...props
  }
}

export { messageGap, messageTag, messageVNodeAll, createMessage, initProps }
