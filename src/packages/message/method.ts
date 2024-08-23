import type { PropsType } from './types'
import { createVNode, render } from 'vue'
import { messageClass } from './messageCall'
import { notificationClass } from './notificationCall'
import Message from './message.vue'
import Notification from './notification.vue'

// 初始化固定参数
const MESSAGE_GAP = 24
const MESSAGE_TAG = `tui`
// message组件VNode虚拟dom集合（包含notification）
const messageVNodeAll: InstanceType<typeof Message>[] = []
/**
 * 判断是否是notification组件触发
 * @param messageType message类型
 */
export const isNotification = (messageType: PropsType['messageType']) => messageType === 'notice'

/**
 * 全局获取最后一个Message组件(区分messageType)
 * @param messageType message类型
 * @returns { lastMessageEl, messageAllEl }
 */
function getLastMessage(messageType: PropsType['messageType']) {
  let max = 0
  let lastMessageEl: HTMLElement | undefined = void 0
  const className = isNotification(messageType) ? notificationClass : messageClass
  const messageAllEl: HTMLElement[] = Array.from(document.querySelectorAll(`.${className}[${MESSAGE_TAG}]`))
  messageAllEl.forEach((el) => {
    if (el.offsetTop >= max) {
      max = el.offsetTop
      lastMessageEl = el
    }
  })
  return { lastMessageEl, messageAllEl }
}
/**
 * 创建一个 node 虚拟组件并渲染
 * @param props 组件参数
 * @returns {VNode}
 */
function createMessage(props: PropsType) {
  const { duration, maxLength, messageType } = props
  // 得出最后一个message组件dom元素
  const { lastMessageEl, messageAllEl } = getLastMessage(messageType)
  // 处理maxLength参数
  if (messageAllEl.length > maxLength) return
  // 根据不同messageType初始化xy轴位置
  const custom = initCustom(props, lastMessageEl)
  // 创建一个虚拟dom
  const VNode = createVNode(isNotification(messageType) ? Notification : Message, {
    ...props,
    ...{ custom }
  })
  // 渲染
  render(VNode, document.createElement('div'))
  // 获取dom实例
  const component = VNode.component.exposed as InstanceType<typeof Message>
  // 新增message实例在虚拟dom集合元素中
  messageVNodeAll.push(component)
  // 控制是否显示时长
  if (duration) {
    window.setTimeout(() => component.closeMessage(), duration)
  }
  return { VNode: VNode }
}
/**
 * 初始化xy轴位置
 * @param props 参数
 * @param lastMessageEl 最后一个message元素
 * @returns  PropsType['custom']
 */
function initCustom(props: PropsType, lastMessageEl: HTMLElement): PropsType['custom'] {
  const { messageType } = props
  let custom = { x: '50%', y: `${MESSAGE_GAP}px` }
  if (isNotification(messageType)) {
    custom = { x: `${MESSAGE_GAP}px`, y: `${MESSAGE_GAP}px` }
  }
  // 处理下一个位置
  if (lastMessageEl) {
    custom.y = `${lastMessageEl.offsetHeight + lastMessageEl.offsetTop + MESSAGE_GAP}px`
  }
  return custom
}
/**
 * 初始化参数
 * @param props 参数
 * @returns PropsType
 */
function initProps(props?: PropsType) {
  return {
    ...{ duration: 2600, maxLength: 8 },
    ...props
  }
}

export { MESSAGE_GAP, MESSAGE_TAG, messageVNodeAll, createMessage, initProps }
